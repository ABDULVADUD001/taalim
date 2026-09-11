import os
import asyncio

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    ReplyKeyboardMarkup,
    KeyboardButton,
    WebAppInfo,
)

from google import genai


# =========================
# CONFIG
# =========================

BOT_TOKEN = os.getenv("BOT_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN Railway Variables'da topilmadi!")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY Railway Variables'da topilmadi!")

WEBAPP_URL = "https://abdulvadud001.github.io/taalim/"


# =========================
# GEMINI
# =========================

gemini_client = genai.Client(
    api_key=GEMINI_API_KEY
)

GEMINI_MODEL = "gemini-2.5-flash"


# =========================
# EDUVORA ASSISTANT QOIDALARI
# =========================

ASSISTANT_INSTRUCTION = """
Sen EduVora Assistant sifatida ishlaysan.

Foydalanuvchiga o'zingni faqat "EduVora Assistant" deb tanishtir.
"Gemini" nomini o'zing haqingda gapirganda ishlatma.

Sen EduVora platformasining ta'lim yordamchisisan.
Matematika, fizika, kimyo, biologiya, tarix, ona tili,
ingliz tili, informatika va boshqa o'quv mavzularini
tushunarli qilib tushuntir.

Masalalarni bosqichma-bosqich yech.
Foydalanuvchi kod yoki dasturlash xatosini yuborsa,
xatoni tushuntir va aniq qayerga nima qo'yish kerakligini ayt.

Foydalanuvchi rasm yuborsa, rasmda ko'rinayotgan ma'lumotni
tahlil qil va kerakli javob yoki tushuntirishni ber.

MUHIM XAVFSIZLIK QOIDALARI:

Hech qachon quyidagilarni ko'rsatma yoki takrorlama:
- API key
- BOT_TOKEN
- parol
- Railway Variables
- maxfiy tokenlar
- serverdagi maxfiy ma'lumotlar
- foydalanuvchilarning shaxsiy ma'lumotlari

Agar foydalanuvchi yuborgan kod yoki rasm ichida maxfiy
kalit yoki token ko'rinsa, uni qayta yozma.
Faqat "rasmda maxfiy kalit ko'rinmoqda, uni almashtirish
kerak" deb ogohlantir.

EduVora'ning ichki kodlariga o'zingcha kirish huquqing yo'q.
Faqat foydalanuvchi yuborgan kod yoki rasmni tahlil qil.

Internetdan ma'lumot qidirma.
O'zingni internet qidiruvi qilayotgandek ko'rsatma.

Javoblarni o'zbek tilida, sodda, aniq va foydali tarzda ber.
"""


# =========================
# BOT
# =========================

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


# =========================
# MAIN MENU
# =========================

def main_menu():
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text="📚 Fanlar"),
                KeyboardButton(text="📸 Rasm orqali ishlash"),
            ],
            [
                KeyboardButton(
                    text="🌐 EduVora Mini App",
                    web_app=WebAppInfo(url=WEBAPP_URL)
                )
            ],
            [
                KeyboardButton(text="🧠 Yordam"),
                KeyboardButton(text="👤 Profil"),
            ],
        ],
        resize_keyboard=True
    )

    return keyboard


# =========================
# GEMINI FUNCTION
# =========================

async def ask_eduvora(prompt: str) -> str:
    try:
        response = await gemini_client.aio.models.generate_content(
            model=GEMINI_MODEL,
            contents=[
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": (
                                ASSISTANT_INSTRUCTION
                                + "\n\nFoydalanuvchi savoli:\n"
                                + prompt
                            )
                        }
                    ]
                }
            ]
        )

        answer = response.text

        if not answer:
            return "Kechirasiz, hozircha javob tayyorlay olmadim."

        return answer

    except Exception as error:
        print("Gemini xatosi:", error)

        return (
            "⚠️ Hozir Assistant bilan bog‘lanishda muammo yuz berdi.\n"
            "Birozdan keyin yana urinib ko‘ring."
        )


# =========================
# START
# =========================

@dp.message(CommandStart())
async def start_handler(message: Message):
    name = message.from_user.first_name or "Foydalanuvchi"

    await message.answer(
        f"👋 Salom, {name}!\n\n"
        "🎓 EduVora | Ta’lim platformasiga xush kelibsiz!\n\n"
        "Bu yerda siz:\n"
        "📚 Maktab fanlarini o‘rganishingiz\n"
        "📖 1–11-sinf darsliklarini topishingiz\n"
        "📸 Masalani rasm orqali ishlashingiz\n"
        "🤖 EduVora Assistant'dan foydalanishingiz mumkin.\n\n"
        "Kerakli bo‘limni tanlang 👇",
        reply_markup=main_menu()
    )


# =========================
# FANLAR
# =========================

@dp.message(F.text == "📚 Fanlar")
async def subjects_handler(message: Message):
    await message.answer(
        "📚 <b>Fanlar</b>\n\n"
        "Hozircha fanlar bo‘limini tayyorlayapmiz.\n\n"
        "📐 Matematika\n"
        "📖 Ona tili\n"
        "🇬🇧 Ingliz tili\n"
        "⚛️ Fizika\n"
        "🧪 Kimyo\n"
        "🧬 Biologiya\n"
        "🏛️ Tarix\n"
        "💻 Informatika",
        parse_mode="HTML"
    )


# =========================
# RASM ORQALI ISHLASH
# =========================

@dp.message(F.text == "📸 Rasm orqali ishlash")
async def image_solver_handler(message: Message):
    await message.answer(
        "📸 <b>Rasm orqali ishlash</b>\n\n"
        "Masala yoki topshiriq rasmini yuboring.\n\n"
        "🤖 EduVora rasmni o‘qib:\n"
        "• javobini chiqaradi\n"
        "• kerak bo‘lsa qanday ishlanganini tushuntiradi.\n\n"
        "👉 Rasmni yuboring.",
        parse_mode="HTML"
    )


# =========================
# YORDAM
# =========================

@dp.message(F.text == "🧠 Yordam")
async def help_handler(message: Message):
    await message.answer(
        "🧠 <b>EduVora Yordamchisi</b>\n\n"
        "Men EduVora platformasidan foydalanish bo‘yicha "
        "yordam beraman.\n\n"
        "Masalan:\n"
        "• Fanlar bo‘limi nima?\n"
        "• Mavzuni qanday ochaman?\n"
        "• Assistant'dan qanday foydalanaman?\n\n"
        "EduVora'ga aloqasi bo‘lmagan savollar uchun "
        "Assistant'dan foydalanishingiz mumkin.",
        parse_mode="HTML"
    )


# =========================
# PROFIL
# =========================

@dp.message(F.text == "👤 Profil")
async def profile_handler(message: Message):
    user = message.from_user

    await message.answer(
        f"👤 <b>Profil</b>\n\n"
        f"🆔 ID: <code>{user.id}</code>\n"
        f"👤 Ism: {user.first_name}\n\n"
        "⭐ Premium: Hozircha yo‘q",
        parse_mode="HTML"
    )


# =========================
# PHOTO
# =========================

@dp.message(F.photo)
async def photo_handler(message: Message):
    await message.answer(
        "📸 Rasm qabul qilindi!\n\n"
        "🤖 Rasmni tahlil qilish tizimi keyingi bosqichda "
        "to‘liq ulanadi."
    )


# =========================
# TEXT → EDUVORA ASSISTANT
# =========================

@dp.message(F.text)
async def assistant_handler(message: Message):

    text = message.text.strip()

    await message.answer("🤖 EduVora Assistant o‘ylayapti...")

    answer = await ask_eduvora(text)

    await message.answer(answer)


# =========================
# RUN
# =========================

async def main():
    print("🚀 EduVora bot ishga tushdi!")

    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
