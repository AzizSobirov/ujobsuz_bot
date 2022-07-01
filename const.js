const { Keyboard, Key } = require("telegram-keyboard");

// Команды бота
const commands = `
/start - Перезапустить бота
/help - Помощь
/course - Курсы
/users - Пользователи
`;

// keyboards
const keyboard = Keyboard.make([
  Key.callback("📚 Kurslar", "action1"),
//   Key.callback("Button 2", "action2"),
  //     [
  //     {
  //       text: "📚 Kurslar",
  //       callback_data: "courses",
  //     },
  //     {
  //       text: "Biz haqimizda",
  //       callback_data: "about",
  //     },
  //   ],
]).reply();

// courses
const courses = Keyboard.make([
  [
    Key.callback("🌐 WEB DASTURLASH", "web"),
    Key.callback("📊 BUXGALTERIYA", "buxgalteriya"),
  ],
  [
    {
      text: "Bosh sahifa",
      callback_data: "btn_4",
    },
  ],
]).reply();

// Текстовые константы
const text1 = `
1 <b>Жирный Текст</b> для проверки обработчика и <a href="https://youtube.com/">ссылка без превью</a>
`;
const text2 = `
2 <i>Курсивный Текст</i> для проверки обработчика, <s>Зачёркнутый текст</s> и <code>Моноширинный текст</code>
`;
const text3 = `
3 <u>Подчёркнутый Текст</u> для проверки обработчика и <a href="https://youtube.com/">ссылка с превью</a>
`;
// Экспорт констант
module.exports.commands = commands;
module.exports.text1 = text1;
module.exports.text2 = text2;
module.exports.text3 = text3;
module.exports.keyboard = keyboard;
module.exports.courses = courses;
