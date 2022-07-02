const { Telegraf, Markup, Composer, Scenes, session } = require("telegraf");
require("dotenv").config();
const my_const = require("./const");
const bot = new Telegraf("5537312113:AAHBC0M73um0Ia9bsQYtsXOIUFVxl-4edl0");
const { Keyboard, Key } = require("telegram-keyboard");
const fb = require("firebase/database");
const db = require("./db");
const menuScene = require("./register");
// ***************? //

const stage = new Scenes.Stage([menuScene]);
bot.use(session());
bot.use(stage.middleware());

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
    my_const.keyboard
  );
});

// * Обработка Kurslar
bot.hears("📚 Kurslar", (ctx) => {
  ctx.reply("Kurslar", my_const.courses);
});

// * Обработка Bosh sahifa
bot.hears("Bosh sahifa", (ctx) => {
  ctx.reply("Bosh sahifa", my_const.keyboard);
});

let course = "";

bot.hears("🌐 WEB DASTURLASH", (ctx) => {
  course = "Web dasturlash";
  ctx.reply(
    `{ 1+1 =  FrontEnd + BackEnd}
    Biznesga yo'naltirilgan web dasturlash.
    ✔️   HTML 5
    ✔️   CSS
    ✔️   JS
    ✔️  BOOTSTAP
    ✔️  jQuery
    ✔️  PHP&MySQL
    ✔️  CMS (Wordpress, Joomla, Drupal, OpenCart)
    ✔️  Responsive Template
    ✔️  Internet Magazin yaratish
    ✅ {SERTIFIKAT} beriladi!

    (Darslar: 4 oy davomida haftaning juft yoki toq kunlarida bo'ladi. Har bir dars 2 soatdan.)
    💸 KURS NARXI - ( 1 400 000 so'm ).`,
    Keyboard.make([Key.callback("Kursga yozilish")]).reply()
  );
});

bot.hears("📊 BUXGALTERIYA", (ctx) => {
  course = "Buxgalteriya";
  ctx.reply(
    `"Buxgalteriya noldan balansgacha" kursi haqida batafsil ma'lumotlar

➡️ https://bit.ly/3t0Vvc1F
    
👨🏻‍💻 Kurs mentori: Umarbek Jabborov
    
@upgradeacademy_uz`,
    Keyboard.make([Key.callback("Kursga yozilish")]).reply()
  );
});

bot.hears("Kursga yozilish", (ctx) => {
  ctx.state.course = course;
  ctx.scene.enter("register");
});

bot.hears("Bekor qilish", (ctx) => {
  console.log(ctx);
  ctx.reply("Bekor qilindi", my_const.keyboard);
  return ctx.scene.leave("web");
});

// ? Callback кнопки

// const startNewReview = async (ctx) => {
//   try {
//     await ctx.scene.enter("web");
//   } catch (e) {
//     console.log(e);
//   }
//   // ctx.scene.session.user_id = data[1];
// };

bot.on("callback_query", async (ctx) => {
  const { data } = ctx.callbackQuery;
  if (data == "web") {
    await ctx.reply('Iltimos "Kursga yozilish" tugmasini bosing!');
    await ctx.scene.enter("web");
    // return await startNewReview(ctx);
    // try {
    //   ctx.scene.enter("web");
    // } catch (e) {
    //   console.log(e);
    // }
  }
});

// await ctx.answerCbQuery("Kurslar");
// await ctx.editMessageText(
//   "Kurslar",
//   Keyboard.make([
//     Key.callback("📚 Kurslar", "action1"),
//     Key.callback("Js", "action2"),
//   ]).inline()
// );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

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
