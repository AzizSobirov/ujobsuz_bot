const { Composer, Scenes } = require("telegraf");

const getName = new Composer();
getName.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    ctx.wizard.state.data.id = ctx.from.id;
    ctx.wizard.state.data.first_name = ctx.from.first_name;
    ctx.wizard.state.data.last_name = ctx.from.last_name;
    ctx.wizard.state.data.username = ctx.from.username;
    ctx.wizard.state.data.course = ctx.message.text;
    await ctx.reply("Ismingizni kiriting");
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const getOld = new Composer();
getOld.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.name = ctx.message.text;
    await ctx.reply("Yoshingizni kiriting");
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const getNumber = new Composer();
getNumber.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.old = ctx.message.text;
    await ctx.reply("Telefon raqamingizni kiriting");
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});
// const phone = {
//   reply_markup: {
//     one_time_keyboard: true,
//     inline_keyboard: [
//       [
//         {
//           text: "My phone number",
//           request_contact: true,
//           one_time_keyboard: true,
//           callback_data: "contact",
//         },
//       ],
//     ],
//   },
// };

// const contact = new Composer();
// contact.action("contact", async (ctx) => {
//   try {
//     ctx.wizard.state.data.number = ctx.message.contact.phone_number;
//     return ctx.wizard.next();
//   } catch (e) {
//     console.log(e);
//   }
// });

const finished = new Composer();
finished.on("text", async (ctx) => {
  try {
    let user = ctx.wizard.state.data;
    user.number = ctx.message.text;

    ctx.reply(
      `Ism: ${user.first_name}
    Familiya: ${user.last_name}   
    Ism: ${user.name}
    Yoshingiz: ${user.old}
    Telefon raqamingiz: ${user.number}
    Kurs: ${user.course}`
    );
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

const menuScene = new Scenes.WizardScene(
  "web",
  getName,
  getOld,
  getNumber,
  //   contact,
  finished
);

module.exports = menuScene;
