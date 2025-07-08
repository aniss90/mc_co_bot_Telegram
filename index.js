const express = require('express');
const { Telegraf } = require('telegraf');

const TOKEN = '7932950331:AAGkYxQOlV04JBjXuvDW3_8qjvaE8TTnXNc';
const bot = new Telegraf(TOKEN);
const app = express();

// الأوامر
bot.start((ctx) => ctx.reply('👋 أهلاً بك في بوت أنيس!'));
bot.help((ctx) => ctx.reply('❓ أرسل أي شيء وسأرد عليك.'));
bot.on('text', (ctx) => {
  ctx.reply(`📩 لقد أرسلت: ${ctx.message.text}`);
});

// إعداد Webhook
app.use(bot.webhookCallback(`/bot${TOKEN}`));

app.get('/', (req, res) => {
  res.send('🤖 البوت شغال!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`✅ Listening on port ${PORT}`);
  await bot.telegram.setWebhook(`https://اسم-تطبيقك.onrender.com/bot${TOKEN}`);
});