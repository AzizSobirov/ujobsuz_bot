const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const my_const = require("./const");
const bot = new Telegraf("5537312113:AAHBC0M73um0Ia9bsQYtsXOIUFVxl-4edl0");
const { Keyboard, Key } = require("telegram-keyboard");
const fb = require("firebase/database");
const db = require("./db");

// ***************? //

//! Обработка команды /start
bot.start((ctx) => {
  fb.set(fb.ref(db, "users/" + ctx.from.id), {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    username: ctx.from.username,
  });

  ctx.replyWithHTML(
    `Assalomu alaykum ${
      ctx.message.from.first_name
        ? "<b>" + ctx.message.from.first_name + "</b>"
        : "незнакомец"
    } \n 
    Siz <a href='https://ujob.ml'>Upgrade Academy</a> Dasturlash o'quv markazining rasmiy botiga tashrif buyurdingiz.
    O'quv markazimizda quyidagi dasturlash kurslariga yozilishingiz mumkin!`,
    Keyboard.make([
      [
        {
          text: "📚 Kurslar",
          callback_data: "courses",
        },
        {
          text: "Biz haqimizda",
          callback_data: "about",
        },
      ],
    ]).reply()
  );

  // ctx.reply("Simple built-in keyboard", keyboard.reply());
  // ctx.reply("Simple inline keyboard", keyboard.inline());

  // keyboar
});

bot.on("callback_query", async (ctx) => {
  const { data } = ctx.callbackQuery;
  console.log(data);
  if (data === "courses") {
    ctx.replyWithHTML(
      `<b>📚 Kurslar</b>
      <i>
      <a href='https://ujob.ml/courses/'>Kurslar</a>
      </i>`,
      Keyboard.make([
        [
          {
            text: "📚 Kurslar",
            callback_data: "courses",
          },
          {
            text: "Biz haqimizda",
            callback_data: "about",
          },
        ],
      ]).reply()
    );
  }
});

// * Обработка команды Kurslar
// // bot.hears("📚 Kurslar", (ctx) => {
//   bot.telegram.sendMessage(
//     ctx.chat.id,
//     "Kurslar",
//     Keyboard.make([
//       [
//         Key.callback("Редакторы", "btn_1"),
//         Key.callback("Обзоры", "btn_2"),
//         Key.callback("JS", "btn_3"),
//       ],
//       [
//         {
//           text: "Bosh sahifa",
//           callback_data: "btn_4",
//         },
//       ],
//     ]).reply()
//   );
// // });

// * Обработка команды Bosh sahifa
bot.hears("Bosh sahifa", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    '<a href="https://ujob.ml">Upgrade Academy</a>',
    Keyboard.make([
      [
        {
          text: "📚 Kurslar",
          callback_data: "courses",
        },
        {
          text: "Biz haqimizda",
          callback_data: "about",
        },
      ],
    ]).reply()
  );
});

//! Обработка команды /help
bot.help((ctx) => ctx.reply(my_const.commands));
//! Обработка команды /course
bot.command("course", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Курсы</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Редакторы", "btn_1"),
          Markup.button.callback("Обзоры", "btn_2"),
          Markup.button.callback("JS", "btn_3"),
        ],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});
//! users
bot.command("users", async (ctx) => {
  try {
    let users = [];
    fb.onChildAdded(fb.ref(db, "users"), (snapshot) => {
      users.push(snapshot.val());
    });
    await ctx.replyWithHTML("<b>Users:</b>" + users.length);
  } catch (e) {
    console.error(e);
  }
});

//! Обработка команды
bot.hears("phone", (ctx, next) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Can we get access to your phone number?",
    requestPhoneKeyboard
  );
});

//method for requesting user's location

bot.hears("location", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Can we access your location?",
    requestLocationKeyboard
  );
});

//constructor for providing phone number to the bot

const requestPhoneKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My phone number",
          request_contact: true,
          one_time_keyboard: true,
        },
      ],
      ["Cancel"],
    ],
  },
};
//constructor for proving location to the bot

const requestLocationKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My location",
          request_location: true,
          one_time_keyboard: true,
        },
      ],
      ["Cancel"],
    ],
  },
};

/**
 * Функция для отправки сообщения ботом
 * @param {String} id_btn Идентификатор кнопки для обработки
 * @param {String} src_img Путь к изображению, или false чтобы отправить только текст
 * @param {String} text Текстовое сообщение для отправки
 * @param {Boolean} preview Блокировать превью у ссылок или нет, true - блокировать, false - нет
 */
function addActionBot(id_btn, src_img, text, preview) {
  bot.action(id_btn, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      if (src_img !== false) {
        await ctx.replyWithPhoto({
          source: src_img,
        });
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: preview,
      });
    } catch (e) {
      console.error(e);
    }
  });
}

// Обработчик кнопок с помощью функции
addActionBot("btn_1", "./img/1.jpg", my_const.text1, true);
addActionBot("btn_2", "./img/2.jpg", my_const.text2, true);
addActionBot("btn_3", false, my_const.text3, false);

// Запустить бота
bot.launch();

// Включить плавную остановку
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
