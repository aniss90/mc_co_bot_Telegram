from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("السلام عليكم! أنا البوت شغال 🎉")

if __name__ == '__main__':
    app = ApplicationBuilder().token("7932950331:AAGkYxQOlV04JBjXuvDW3_8qjvaE8TTnXNc").build()
    app.add_handler(CommandHandler("start", start))
    app.run_polling()