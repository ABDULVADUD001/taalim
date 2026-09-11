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
# HEALTH
# =========================

@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }


# =========================
# ASSISTANT
# =========================

@app.post("/api/assistant")
async def assistant(
    message: str = Form(""),
    image: UploadFile | None = File(None),
):
    message = message.strip()

    if not message and not image:
        raise HTTPException(
            status_code=400,
            detail="Savol yoki rasm yuboring.",
        )

    # Hozircha Assistant'ga faqat matn yuboramiz.
    # Rasm funksiyasini keyin bot.py bilan moslab qo‘shamiz.

    if image:
        raise HTTPException(
            status_code=400,
            detail=(
                "Rasm orqali savol berish funksiyasi "
                "hali ulanmagan."
            ),
        )

    try:
        answer = await ask_eduvora(message)

    except Exception as error:
        print(f"Assistant API xatosi: {error}")

        raise HTTPException(
            status_code=500,
            detail="Assistant hozircha javob bera olmadi.",
        )

    return {
        "success": True,
        "answer": answer,
    }
