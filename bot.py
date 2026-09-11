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
from google.genai import types


# =========================================================
# CONFIG
# =========================================================

BOT_TOKEN = os.getenv("BOT_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

WEBAPP_URL = "https://abdulvadud001.github.io/taalim/"

# Yangi Gemini modeli
GEMINI_MODEL = "gemini-3.6-flash"


if not BOT_TOKEN:
    raise ValueError(
        "BOT_TOKEN Railway Variables'da topilmadi!"
    )

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY Railway Variables'da topilmadi!"
    )


# =========================================================
# BOT
# =========================================================

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


# =========================================================
# GEMINI CLIENT
# =========================================================

gemini_client = genai.Client(
    api_key=GEMINI_API_KEY
)


# =========================================================
# EDUVORA ASSISTANT
# =========================================================

ASSISTANT_INSTRUCTION = """
Sen EduVora Assistant sifatida ishlaysan.

Foydalanuvchiga o'zingni faqat "EduVora Assistant" deb tanishtir.

Ichki AI model, API yoki xizmat nomini o'zing haqingda
gapirganda aytma.

Sen EduVora platformasining ta'lim yordamchisisan.

Sening vazifalaring:

- Umumiy savollarga javob berish.
- O'quv mavzularini tushuntirish.
- Matematika masalalarini yechish.
- Fizika, kimyo, biologiya, tarix,
  ona tili, ingliz tili va informatika
  mavzularini tushuntirish.
- Dasturlash bo'yicha yordam berish.
- Koddagi xatolarni tahlil qilish.
- Foydalanuvchi yuborgan kodni tuzatish.
- Screenshotdagi kod yoki xatoni tushuntirish.

MASALA:

Agar foydalanuvchi masala yuborsa,
uni bosqichma-bosqich tushuntir.

KOD:

Agar foydalanuvchi kod yuborsa:

1. Xatoni aniqlashga harakat qil.
2. Xato sababini tushuntir.
3. To'g'ri kodni ber.
4. Qaysi joyga nima qo'yish kerakligini aniq ayt.
5. Kerak bo'lsa to'liq tayyor kod ber.

Masalan:

"Eski koddagi shu qismni o'chiring.
O'rniga mana buni qo'ying."

SCREENSHOT:

Agar foydalanuvchi screenshot yuborsa:

- Rasmni tahlil qil.
- Undagi xatoni tushuntir.
- Kod ko'rinsa, kodni tahlil qil.
- Tuzatish uchun aniq ko'rsatma ber.

MUHIM:

Sen EduVora loyihasining ichki fayllariga avtomatik
kirish huquqiga ega emassan.

Faqat foydalanuvchi yuborgan ma'lumotni tahlil qil.

Foydalanuvchi yubormagan kodni o'zingdan uydirma.

MAXFIY MA'LUMOTLAR:

Hech qachon quyidagilarni qayta yozma yoki ko'rsatma:

- API key
- BOT_TOKEN
- parol
- Railway Variables
- maxfiy tokenlar
- serverdagi maxfiy ma'lumotlar
- boshqa maxfiy ma'lumotlar

Agar foydalanuvchi yuborgan kod yoki screenshot ichida
API key yoki token ko'rinsa, uni javobda takrorlama.

Buning o'rniga:

"⚠️ Rasm yoki kod ichida maxfiy kalit/token ko'rinmoqda.
Uni oshkor qilmaslik uchun almashtirish kerak."

deb ogohlantir.

INTERNET:

Internetdan ma'lumot qidirma.

O'zingni internet qidiruvi qilayotgandek ko'rsatma.

JAVOB USLUBI:

Javoblarni asosan o'zbek tilida ber.

Sodda, aniq va tushunarli yoz.

Keraksiz uzun javoblardan qoch.

Agar foydalanuvchi "Sen kimsan?" desa:

"👋 Men EduVora Assistantman.

Men EduVora platformasida savollaringizga javob berish,
mavzularni tushuntirish va masalalarni yechishda
yordam berish uchun yaratilganman."

mazmunida javob ber.

EduVora haqida savol berilganda faqat EduVora'ning
mavjud funksiyalariga tayan.

EduVora funksiyalarini o'zingcha uydirma.

Foydalanuvchiga imkon qadar foydali javob ber.
"""


# =========================================================
# GEMINI / EDUVORA REQUEST
# =========================================================

async def ask_eduvora(prompt: str) -> str:
    try:

        interaction = await asyncio.to_thread(
            gemini_client.interactions.create,
            model=GEMINI_MODEL,
            input=prompt,
            system_instruction=ASSISTANT_INSTRUCTION,
        )

        answer = interaction.output_text

        if not answer:
            return (
                "Kechirasiz, hozircha javob tayyorlay olmadim."
            )

        return answer.strip()

    except Exception as error:

        print(
            "EDUVORA ASSISTANT XATOSI:",
            repr(error)
        )

        return (
            "⚠️ Assistant bilan bog‘lanishda muammo yuz berdi.\n\n"
            "Iltimos, birozdan keyin yana urinib ko‘ring."
        )


# =========================================================
# MAIN MENU
# =========================================================

def main_menu():

    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text="📚 Fanlar"),
                KeyboardButton(
                    text="🌐 EduVora Mini App",
                    web_app=WebAppInfo(
                        url=WEBAPP_URL
                    )
                ),
            ],
            [
                KeyboardButton(text="🧠 Yordam"),
                KeyboardButton(text="👤 Profil"),
            ],
        ],
        resize_keyboard=True,
        is_persistent=True,
    )

    return keyboard


# =========================================================
# START
# =========================================================

@dp.message(CommandStart())
async def start_handler(message: Message):

    name = message.from_user.first_name or "Foydalanuvchi"

    await message.answer(
        f"👋 Salom, {name}!\n\n"
        "🎓 <b>EduVora</b> ta'lim platformasiga xush kelibsiz!\n\n"
        "EduVora orqali:\n\n"
        "📚 Fanlarni o‘rganishingiz\n"
        "📖 Mavzularni bosqichma-bosqich ko‘rishingiz\n"
        "🤖 EduVora Assistant bilan suhbatlashishingiz\n"
        "💻 Kod va xatolarni tahlil qilishingiz mumkin.\n\n"
        "Kerakli bo‘limni tanlang 👇",
        reply_markup=main_menu(),
        parse_mode="HTML",
    )


# =========================================================
# FANLAR
# =========================================================

@dp.message(F.text == "📚 Fanlar")
async def subjects_handler(message: Message):

    await message.answer(
        "📚 <b>EduVora Fanlari</b>\n\n"
        "📐 Matematika\n"
        "📖 Ona tili\n"
        "🇬🇧 Ingliz tili\n"
        "⚛️ Fizika\n"
        "🧪 Kimyo\n"
        "🧬 Biologiya\n"
        "🏛️ Tarix\n"
        "💻 Informatika\n\n"
        "🌐 To‘liq fanlar va mavzularni "
        "EduVora Mini App orqali ko‘rishingiz mumkin.",
        parse_mode="HTML",
    )


# =========================================================
# YORDAM
# =========================================================

@dp.message(F.text == "🧠 Yordam")
async def help_handler(message: Message):

    await message.answer(
        "🧠 <b>EduVora Yordam</b>\n\n"
        "📚 <b>Fanlar</b>\n"
        "Fanlar va mavzularni ko‘rish uchun ishlatiladi.\n\n"
        "🌐 <b>EduVora Mini App</b>\n"
        "EduVora platformasini ochadi.\n\n"
        "🤖 <b>EduVora Assistant</b>\n"
        "Savollar, masalalar, dasturlash va xatolarni "
        "tushuntirishda yordam beradi.\n\n"
        "👤 <b>Profil</b>\n"
        "Foydalanuvchi profilingizni ko‘rsatadi.",
        parse_mode="HTML",
    )


# =========================================================
# PROFIL
# =========================================================

@dp.message(F.text == "👤 Profil")
async def profile_handler(message: Message):

    user = message.from_user

    await message.answer(
        f"👤 <b>Profil</b>\n\n"
        f"🆔 ID: <code>{user.id}</code>\n"
        f"👤 Ism: {user.first_name}\n\n"
        "⭐ Premium: Hozircha yo‘q",
        parse_mode="HTML",
    )


# =========================================================
# PHOTO
# =========================================================

@dp.message(F.photo)
async def photo_handler(message: Message):

    await message.answer(
        "📸 Rasm qabul qilindi!\n\n"
        "🤖 Rasm tahlili Mini App Assistant backendiga "
        "ulanadigan keyingi bosqichda ishlaydi."
    )


# =========================================================
# TEXT → ASSISTANT
# =========================================================

@dp.message(F.text)
async def assistant_handler(message: Message):

    text = message.text.strip()

    if not text:
        return

    # Menu tugmalari
    if text == "📚 Fanlar":
        return

    if text == "🧠 Yordam":
        return

    if text == "👤 Profil":
        return

    await message.bot.send_chat_action(
        chat_id=message.chat.id,
        action="typing",
    )

    answer = await ask_eduvora(text)

    await message.answer(answer)


# =========================================================
# UNKNOWN
# =========================================================

@dp.message()
async def unknown_handler(message: Message):

    await message.answer(
        "🤔 Bu xabarni tushunmadim.\n\n"
        "Quyidagi menyudan kerakli bo‘limni tanlang 👇",
        reply_markup=main_menu(),
    )


# =========================================================
# RUN
# =========================================================

async def main():

    print("🚀 EduVora bot ishga tushdi!")

    await dp.start_polling(bot)


# =========================================================
# START
# =========================================================

if __name__ == "__main__":
    asyncio.run(main())
