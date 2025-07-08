const express = require('express');
const { Telegraf } = require('telegraf');

const TOKEN = '7932950331:AAGkYxQOlV04JBjXuvDW3_8qjvaE8TTnXNc';
const bot = new Telegraf(TOKEN);
const app = express();

app.use(bot.webhookCallback(`/bot${TOKEN}`));

// مثال للرد
bot.start((ctx) => ctx.reply('مرحبًا بك!'));
bot.help((ctx) => ctx.reply('كيف أقدر أساعدك؟'));
bot.on('text', (ctx) => ctx.reply(`أرسلت: ${ctx.message.text}`));

// إعداد Webhook بعد تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('البوت يعمل!'));

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await bot.telegram.setWebhook(`https://اسم-التطبيق.onrender.com/bot${TOKEN}`);
});