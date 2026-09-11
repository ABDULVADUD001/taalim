import os

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware

from bot import ask_eduvora


app = FastAPI(
    title="EduVora API",
    version="1.0.0",
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://abdulvadud001.github.io",
    ],
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST",
        "OPTIONS",
    ],
    allow_headers=["*"],
)


# =========================
# HOME
# =========================

@app.get("/")
async def root():
    return {
        "status": "ok",
        "service": "EduVora API",
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }


# =========================
# EDUVORA ASSISTANT
# =========================

@app.post("/api/assistant")
async def assistant(
    message: str = Form(""),
    image: UploadFile | None = File(None),
):
    message = message.strip()

    # Hech narsa yuborilmagan bo‘lsa
    if not message and not image:
        raise HTTPException(
            status_code=400,
            detail="Savol yoki rasm yuboring.",
        )

    image_bytes = None
    image_mime = None

    # =========================
    # RASMNI TEKSHIRISH
    # =========================

    if image:
        allowed_types = {
            "image/jpeg",
            "image/png",
            "image/webp",
        }

        if image.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Faqat JPG, PNG yoki WEBP "
                    "rasmlar qabul qilinadi."
                ),
            )

        image_bytes = await image.read()

        # 10 MB limit
        if len(image_bytes) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=413,
                detail=(
                    "Rasm hajmi 10 MB dan oshmasligi kerak."
                ),
            )

        image_mime = image.content_type

    # =========================
    # PROMPT TAYYORLASH
    # =========================

    if image:
        if message:
            prompt = (
                "Foydalanuvchi rasm yubordi.\n\n"
                "Foydalanuvchining izohi yoki savoli:\n"
                f"{message}\n\n"
                "Rasmni diqqat bilan tahlil qil va "
                "savolga aniq javob ber."
            )
        else:
            prompt = (
                "Ushbu rasmni diqqat bilan tahlil qil.\n\n"
                "Agar rasmda masala bo‘lsa, uni yech.\n"
                "Agar rasmda kod bo‘lsa, kodni tahlil qil.\n"
                "Agar xato ko‘rinsa, xatoni tushuntir "
                "va qanday tuzatishni aniq ko‘rsat."
            )
    else:
        prompt = message

    # =========================
    # GEMINI
    # =========================

    try:
        answer = await ask_eduvora(
            prompt=prompt,
            image_bytes=image_bytes,
            image_mime=image_mime,
        )

    except Exception as error:
        print(f"Assistant API xatosi: {error}")

        raise HTTPException(
            status_code=500,
            detail="Assistant hozircha javob bera olmadi.",
        )

    # =========================
    # JAVOB
    # =========================

    return {
        "success": True,
        "answer": answer,
    }
