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

GEMINI_MODEL = "gemini-2.5-flash"


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
# GEMINI
# =========================================================

gemini_client = genai.Client(
    api_key=GEMINI_API_KEY
)


# =========================================================
# EDUVORA ASSISTANT SYSTEM
# =========================================================

ASSISTANT_INSTRUCTION = """
Sen EduVora Assistant sifatida ishlaysan.

Foydalanuvchiga o'zingni faqat "EduVora Assistant" deb tanishtir.
Ichki AI model yoki xizmat nomini o'zing haqingda gapirganda ishlatma.

Sen EduVora platformasining ta'lim yordamchisisan.

Sening asosiy vazifalaring:

1. Umumiy savollarga javob berish.
2. Matematika, fizika, kimyo, biologiya, tarix,
   ona tili, ingliz tili, informatika va boshqa
   o'quv mavzularini tushuntirish.
3. Masalalarni bosqichma-bosqich yechish.
4. Kod va dasturlash xatolarini tushuntirish.
5. Foydalanuvchi yuborgan kodni tahlil qilish.
6. Foydalanuvchi yuborgan screenshot yoki rasmni
   ko'rib, undagi xatoni tushuntirish.
7. Kodni tuzatishda aniq ko'rsatma berish.

Agar foydalanuvchi kod yuborsa:

- Xatoni aniqlashga harakat qil.
- Muammo sababini tushuntir.
- Kerak bo'lsa to'g'ri kodni ber.
- "Mana shu joyga mana buni qo'ying" kabi
  aniq ko'rsatmalar ber.
- Foydalanuvchi yubormagan loyiha fayllarini
  o'zingdan uydirma.
- EduVora loyihasining ichki kodlariga avtomatik
  kirish huquqing yo'q.

Agar foydalanuvchi rasm yoki screenshot yuborsa:

- Rasmda ko'rinayotgan ma'lumotni tahlil qil.
- Kod bo'lsa, kodni tushuntir.
- Xato bo'lsa, xatoni tushuntir.
- Tuzatish uchun aniq qadamlar ber.

MUHIM XAVFSIZLIK QOIDALARI:

Hech qachon quyidagilarni ko'rsatma yoki takrorlama:

- API key
- BOT_TOKEN
- parol
- Railway Variables
- maxfiy tokenlar
- serverdagi maxfiy ma'lumotlar
- foydalanuvchilarning maxfiy ma'lumotlari

Agar foydalanuvchi yuborgan kod yoki rasm ichida
API key, token yoki boshqa maxfiy ma'lumot ko'rinsa:

Uni javobda qayta yozma.

Faqat shunga o'xshash ogohlantirish ber:

"⚠️ Rasm/kod ichida maxfiy kalit yoki token ko'rinmoqda.
Uni oshkor qilmaslik va xavfsizlik uchun almashtirish kerak."

Internetdan ma'lumot qidirma.

O'zingni internet qidiruvi qilayotgandek ko'rsatma.

Javoblarni asosan o'zbek tilida ber.

Javoblar sodda, aniq va foydali bo'lsin.

Agar foydalanuvchi "Sen kimsan?" deb so'rasa:

"👋 Men EduVora Assistantman.

Men EduVora platformasida savollaringizga javob berish,
mavzularni tushuntirish va masalalarni yechishda
yordam berish uchun yaratilganman."

mazmunida javob ber.

EduVora haqida savol berilganda faqat mavjud ma'lumotlarga
tayan. EduVora funksiyalarini o'zingcha uydirma.

Foydalanuvchiga doimo yordam berishga harakat qil.
"""


# =========================================================
# GEMINI REQUEST
# =========================================================

async def ask_eduvora(prompt: str) -> str:
    try:

        response = await asyncio.to_thread(
            gemini_client.models.generate_content,

            model=GEMINI_MODEL,

            contents=prompt,

            config=types.GenerateContentConfig(
                system_instruction=ASSISTANT_INSTRUCTION,
                temperature=0.7,
            ),
        )

        answer = response.text

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
        "Sayt ko‘rinishidagi EduVora platformasini ochadi.\n\n"

        "🤖 <b>EduVora Assistant</b>\n"
        "Savollar, masalalar, dasturlash va xatolarni "
        "tushuntirishda yordam beradi.\n\n"

        "👤 <b>Profil</b>\n"
        "Foydalanuvchi profilingizni ko‘rsatadi.\n\n"

        "Agar Assistant'dan foydalanmoqchi bo‘lsangiz, "
        "Mini App ichidagi 🤖 Assistant bo‘limini oching.",
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
        "🤖 Rasmni tahlil qilish funksiyasi "
        "EduVora Assistant backend'iga ulanmoqda.\n\n"
        "Keyingi bosqichda screenshotdagi kod yoki "
        "masalani Assistant tahlil qiladi."
    )


# =========================================================
# TEXT → EDUVORA ASSISTANT
# =========================================================

@dp.message(F.text)
async def assistant_handler(message: Message):

    text = message.text.strip()

    if not text:
        return

    # Menyu tugmalari bu yerda qayta ishlanmaydi
    if text in [
        "📚 Fanlar",
        "🧠 Yordam",
        "👤 Profil",
    ]:
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
        "EduVora Mini App yoki quyidagi menyudan "
        "kerakli bo‘limni tanlang 👇",
        reply_markup=main_menu(),
    )


# =========================================================
# RUN
# =========================================================

async def main():

    print("🚀 EduVora bot ishga tushdi!")

    await dp.start_polling(bot)


# =========================================================
# ENTRY POINT
# =========================================================

if __name__ == "__main__":
    asyncio.run(main())
