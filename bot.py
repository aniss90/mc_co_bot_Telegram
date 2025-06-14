from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import os

TOKEN = os.getenv("7932950331:AAGkYxQOlV04JBjXuvDW3_8qjvaE8TTnXNc")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("السلام عليكم! ✅ البوت شغال.")

if __name__ == '__main__':
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.run_polling()