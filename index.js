const { Telegraf, Scenes, session } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf("5537312113:AAHBC0M73um0Ia9bsQYtsXOIUFVxl-4edl0");
const { Keyboard, Key } = require("telegram-keyboard");
// firebase database
const fb = require("firebase/database");
const db = require("./db");
// Scenes and const
const menuScene = require("./register");
const my_const = require("./const");

// ! Scene //
const stage = new Scenes.Stage([menuScene]);
bot.use(session());
bot.use(stage.middleware());

//! Command /start
bot.start((ctx) => {
  fb.set(fb.ref(db, "users/" + ctx.from.id), {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    username: ctx.from.username,
  }).then(() => {
    ctx.replyWithHTML(
      `Assalomu alaykum ${
        ctx.message.from.first_name
          ? "<b>" + ctx.message.from.first_name + "</b>"
          : "незнакомец"
      } \n 
Siz <a href='https://t.me/upgradeacademy_uz'>Upgrade Academy</a> Dasturlash o'quv markazining rasmiy botiga tashrif buyurdingiz.
O'quv markazimizda quyidagi dasturlash kurslariga yozilishingiz mumkin!`,
      my_const.keyboard
    );
  });
});

// ! Section Courses
let course = "";
let courses = my_const.courses_arr;

bot.hears("📚 Kurslar", (ctx) => {
  ctx.replyWithHTML(my_const.courses_text, my_const.courses);
});

// ? Back to main menu
bot.hears("🏠 Bosh sahifa", (ctx) => {
  ctx.reply("Bosh sahifa", my_const.keyboard);
});

// ? Back to previous menu
bot.hears("🔙 Orqaga", (ctx) => {
  ctx.replyWithHTML(my_const.courses_text, my_const.courses);
});

// ? Courses
courses.forEach((item) => {
  bot.hears(item.title, (ctx) => {
    course = item.title;
    ctx.replyWithHTML(item.text, my_const.register);
  });
});

// ? Register course
bot.hears("📝 Kursga yozilish", (ctx) => {
  ctx.state.course = course;
  ctx.scene.enter("register");
});

// !  Section About us
bot.hears("📋 Biz haqimizda", (ctx) => {
  ctx.reply("Tez orada");
});
// !  Section About us
bot.hears("📞 Bog'lanish", (ctx) => {
  ctx.reply("Tez orada");
});
// ? Callback кнопки

// Запустить бота
bot.launch();

// Включить плавную остановку
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
