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


# =========================
# CONFIG
# =========================

BOT_TOKEN = os.getenv("BOT_TOKEN")

if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN Railway Variables'da topilmadi!")

WEBAPP_URL = "https://YOUR-GITHUB-USERNAME.github.io/eduvora/"


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
# START
# =========================

@dp.message(CommandStart())
async def start_handler(message: Message):
    name = message.from_user.first_name

    await message.answer(
        f"👋 Salom, {name}!\n\n"
        "🎓 EduVora | Ta’lim platformasiga xush kelibsiz!\n\n"
        "Bu yerda siz:\n"
        "📚 Maktab fanlarini o‘rganishingiz\n"
        "📖 1–11-sinf darsliklarini topishingiz\n"
        "📸 Masalani rasm orqali ishlashingiz\n"
        "🧠 EduVora yordamchisidan foydalanishingiz mumkin.\n\n"
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
        "Masalan:\n"
        "<i>10 + 2 × 5 = ?</i>\n\n"
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
        "Men EduVora haqida ma’lumot beraman va "
        "sizni kerakli bo‘limga olib boraman.\n\n"
        "Masalan:\n"
        "📘 «7-sinf matematika darsligimiz bormi?»\n"
        "→ 7-sinf matematika sahifasiga olib boruvchi tugma.\n\n"
        "EduVora'ga aloqasi bo‘lmagan savollarga javob bermayman.",
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
        "🤖 Hozircha rasmni yechish tizimini ulayapmiz.\n"
        "Keyingi bosqichda AI rasmni o‘qib, "
        "javobini avtomatik chiqaradi."
    )


# =========================
# UNKNOWN MESSAGE
# =========================

@dp.message()
async def unknown_handler(message: Message):
    await message.answer(
        "🤔 Bu buyruqni tushunmadim.\n\n"
        "Quyidagi menyudan kerakli bo‘limni tanlang 👇",
        reply_markup=main_menu()
    )


# =========================
# RUN
# =========================

async def main():
    print("🚀 EduVora bot ishga tushdi!")

    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
