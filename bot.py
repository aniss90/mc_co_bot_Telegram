from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import os

# توكن البوت من متغير البيئة
TOKEN = os.environ.get("BOT_TOKEN")

# الأمر /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("مرحباً! أنا بوتك ✨")

if __name__ == "__main__":
    app = ApplicationBuilder().token(TOKEN).build()

    # إضافة الأوامر
    app.add_handler(CommandHandler("start", start))

    # تشغيل البوت
    app.run_polling()