const { Composer, Scenes } = require("telegraf");
const { Keyboard, Key } = require("telegram-keyboard");
const my_const = require("./const");
const fb = require("firebase/database");
const db = require("./db");

const getName = new Composer();
getName.on("text", (ctx) => {
  try {
    ctx.wizard.state.data = {};
    ctx.wizard.state.data.id = ctx.from.id;
    ctx.wizard.state.data.first_name = ctx.from.first_name;
    ctx.wizard.state.data.last_name = ctx.from.last_name;
    ctx.wizard.state.data.username = ctx.from.username;
    ctx.wizard.state.data.course = ctx.state.course;
    ctx.reply(
      "Ismingizni kiriting",
      Keyboard.make(["🚫 Bekor qilish"]).reply()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const getOld = new Composer();
getOld.on("text", async (ctx) => {
  try {
    if (ctx.message.text.length > 30) {
      ctx.reply("Ismingizni to'g'ri kiriting");
    } else if (ctx.message.text == "🚫 Bekor qilish") {
      cancel(ctx);
    } else {
      ctx.wizard.state.data.name = ctx.message.text;
      await ctx.reply("Yoshingizni kiriting");
      return ctx.wizard.next();
    }
  } catch (e) {
    console.log(e);
  }
});

const getNumber = new Composer();
getNumber.on("text", async (ctx) => {
  try {
    if (!Number(ctx.message.text)) {
      ctx.reply("Yoshinigzni to'g'ri kiriting");
    } else if (ctx.message.text == "🚫 Bekor qilish") {
      cancel(ctx);
    } else {
      ctx.wizard.state.data.old = ctx.message.text;
      await ctx.reply("Telefon raqamingizni kiriting");
      return ctx.wizard.next();
    }
  } catch (e) {
    console.log(e);
  }
});

const getLocation = new Composer();
getLocation.on("text", async (ctx) => {
  try {
    let number = ctx.message.text;
    if (number.includes("+") || number.includes("-") || number.includes(" ")) {
      number = number.replaceAll(/['+','-',' ']/g, "");
    }
    if (
      !Number(parseInt(number)) ||
      number.length <= 8 ||
      number.length >= 13
    ) {
      ctx.reply("Raqamingizni to'g'ri kiriting");
    } else if (ctx.message.text == "🚫 Bekor qilish") {
      cancel(ctx);
    } else {
      ctx.wizard.state.data.number = ctx.message.text;
      await ctx.reply("Manzilni kiriting");
      return ctx.wizard.next();
    }
  } catch (e) {
    console.log(e);
  }
});

const finished = new Composer();
finished.on("text", async (ctx) => {
  try {
    if (Number(ctx.message.text)) {
      ctx.reply("Manzilni to'g'ri kiriting");
    } else if (ctx.message.text == "🚫 Bekor qilish") {
      cancel(ctx);
    } else {
      let user = ctx.wizard.state.data;
      user.location = ctx.message.text;

      ctx.replyWithHTML(
        `<b>${user.course}</b> kursi uchun so'rov ma'lumotlari: \n
<b>Ism:</b> ${user.name}
<b>Yoshingiz:</b> ${user.old}
<b>Telefon raqamingiz:</b> ${user.number}
<b>Manzil:</b> ${user.location}`,
        Keyboard.make([
          Key.callback("✅ Tasdiqlash", "confirm"),
          Key.callback("🚫 Bekor qilish", "cancel"),
        ]).inline()
      );
      return ctx.wizard.next();
    }
  } catch (e) {
    console.log(e);
  }
});

const confirm = new Composer();
confirm.action("confirm", (ctx) => {
  try {
    let time = new Date().toString().slice(0, 25);
    let user = ctx.wizard.state.data;
    fb.set(fb.ref(db, `registered/${time.replace(/[':','+'' ']/g, "")}`), {
      id: user.id,
      key: time.replace(/[':','+'' ']/g, ""),
      name: user.name,
      old: user.old,
      number: user.number,
      location: user.location,
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name : "",
      username: user.username ? user.username : "",
      course: user.course,
      time: time,
    }).then(() => {
      ctx.answerCbQuery();
      ctx.reply(
        "So'rovingiz qabul qilindi yaqin orada adminstratorlar siz bilan bog'lanishadi.",
        my_const.keyboard
      );
      return ctx.scene.leave();
    });
  } catch (e) {
    console.log(e);
  }
});
confirm.action("cancel", async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.reply("So'rovingiz bekor qilindi", my_const.keyboard);
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

function cancel(ctx) {
  ctx.reply("Bekor qilindi", my_const.courses);
  return ctx.scene.leave();
}

const menuScene = new Scenes.WizardScene(
  "register",
  getName,
  getOld,
  getNumber,
  getLocation,
  finished,
  confirm
);
module.exports = menuScene;
