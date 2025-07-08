const express = require('express');
const { Telegraf } = require('telegraf');
const admin = require('firebase-admin');

const app = express();
const TOKEN = '7932950331:AAGkYxQOlV04JBjXuvDW3_8qjvaE8TTnXNc';
const bot = new Telegraf(TOKEN);

// 🟨 تحميل مفتاح Firebase من متغير البيئة
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ✅ إعداد Webhook
app.use(bot.webhookCallback(`/bot${TOKEN}`));
app.get('/', (req, res) => res.send('🤖 البوت شغال!'));

// ✅ أمر البداية
bot.start((ctx) => {
  ctx.reply('👋 مرحبًا بك في بوت MC Community!');
});

// ✅ أمر user_info
const waitingForUsername = {};

bot.command('user_info', (ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply('✏️ أرسل اسم المستخدم (Username) الذي تريد معرفة معلوماته:');
  waitingForUsername[chatId] = true;
});

bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  
  if (waitingForUsername[chatId]) {
    const username = ctx.message.text.trim();
    
    try {
      const docRef = db.collection('users').doc(username);
      const docSnap = await docRef.get();
      
      if (!docSnap.exists) {
        ctx.reply('🚫 لم يتم العثور على مستخدم بهذا الاسم.');
      } else {
        const data = docSnap.data();
        const items = (data.purchasedItems || []).join(', ') || 'لا توجد أدوات مشتراة';
        
        ctx.reply(`📄 معلومات المستخدم:

👤 الاسم الظاهر: ${data.displayName || 'غير متوفر'}
📝 البايو: ${data.bio || 'لا يوجد'}
💰 Fall Tokens: ${data.fallTokens ?? 0}
👍 الإعجابات: ${data.likes ?? 0}
⭐ النقاط: ${data.points ?? 0}
🎁 الأدوات المشتراة: ${items}
        `);
      }
    } catch (error) {
      console.error(error);
      ctx.reply('❌ حدث خطأ أثناء جلب البيانات.');
    }
    
    delete waitingForUsername[chatId]; // مسح حالة الانتظار بعد الاستخدام
  }
});

// ✅ بدء السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot running on port ${PORT}`);
});