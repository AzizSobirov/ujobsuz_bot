const { Keyboard, Key } = require("telegram-keyboard");

// Команды бота
const commands = `
/start - Перезапустить бота
/help - Помощь
/users - Пользователи
`;

// keyboards
const keyboard = Keyboard.make([
  ["📚 Kurslar"],
  ["📋 Biz haqimizda", "📞 Bog'lanish"],
]).reply();

// courses
const courses = Keyboard.make([
  ["🌐 Web dasturlash", "📱 Android dasturlash"],
  ["📸 Grafik dizayn", "🎥 Video montaj"],
  ["📐 Arxitektura va dizayn"],
  ["📹 SMM", "📊 Buxgalteriya"],
  ["🏠 Bosh sahifa"],
]).reply();

const register = Keyboard.make([
  ["📝 Kursga yozilish"],
  ["🔙 Orqaga", "🏠 Bosh sahifa"],
]).reply();

let courses_arr = [
  {
    id: 1,
    title: "🌐 Web dasturlash",
    text: `Python — bugungi kunda eng ommabop dasturlash tillaridan biri. Ushbu dasturlash tilini o’rganish jarayonidagi qiyinchiliklarga qaramasdan o’zlashtirsangiz, keyinchalik daromad ham sizni kuttirib qo’ymaydi. Agar o’zingizni tayyor deb hisoblasangiz sizni «Python» kursida kutamiz. Kursga qabul davom etmoqda.

<b>KURS YO'NALISHI:</b> Web dasturlash

<b>KURS DAVOMIYLIGI:</b> 6-OY

<b>O'QUVCHILAR SONI:</b> 10 KISHI

<b>IMTIYOZLAR:</b> Kurs davomida: Python dasturlash tilida bemalol kod yozish; Kompyuter uchun dasturlar yaratish; Telegram bot yaratish; Web saytlar ishlash va boshqa shu sohaga oid bilim va ko’nikmalarga ega bo'lasiz.`,
  },
  {
    id: 2,
    title: "📱 Android dasturlash",
    text: `Barchasini orqasida Android turibdi. Siz ishlatayotgan ko’pchilik dasturlar, katta loyihalar va pullar orqasida turibdi. Oldingizda cheksiz imkoniyatlar eshigini ochishni istasangiz, ushbu soha maydonida o’zingizni sinab ko’ring. «Android dasturlash» kursi sizni bu sohaga kirishingizga birinchi qadam bo’la oladi. Shoshiling, kursda joylar soni chegaralangan.

    <b>KURS YO'NALISHI:</b> Android dasturlash
    
    <b>KURS DAVOMIYLIGI:</b> 3-OY
    
    <b>O'QUVCHILAR SONI:</b> 10 KISHI
    
    <b>IMTIYOZLAR:</b> Kurs davomida siz quyidagilarni o’rganasiz: Android ilovalarini tayyorlash va ularni Kotlin KMM yordamida IOS ga moslashtirish; Application ilovalar dizayni bilan ishlash; Java va Kotlin kabi dasturlash tillaridan foydalanish; PlayMarketga arizalarni yuborish; Android Studio va boshqa tegishli texnologiyalar bilan ishlash.`,
  },
  {
    id: 3,
    title: "📸 Grafik dizayn",
    text: `Grafik dizayn`,
  },
  {
    id: 4,
    title: "📐 Arxitektura va dizayn",
    text: `Shunchaki g’oya bo’lsa kursorni o’zi kifoya, chunki butun dunyoda 3D grafikasi rivojlanib ulgurdi. Siz ham o’zingizni zamonaviy arxitektor sifatida shakllantirishni xohlasangiz sizni «Arxitektura va dizayn» kursimizda kutamiz.

    KURS YO'NALISHI: ARXITEKTURA DIZAYN
    
    KURS DAVOMIYLIGI: 3-OY
    
    O'QUVCHILAR SONI: 10 KISHI
    
    IMTIYOZLAR: Kurs davomida siz: Lumion, AutoCAD, 3Ds MAX dasturlarida ishlash; 3D modellarini yaratish; Bino ichki va tashqi dizayni; Mebel dizaynlar; Landshaft dizayn yasash; Vizual videolarni tayyorlash va boshqa shu sohaga oid bilimlarga ega bo'lasiz.`,
  },
  {
    id: 5,
    title: "📹 SMM",
    text: `SMM`,
  },
  {
    id: 6,
    title: "📊 Buxgalteriya",
    text: `Buxgalteriya`,
  },
  {
    id: 7,
    title: "🎥 Video montaj",
    text: `Video montaj`,
  },
];

const courses_text = `
<a href='https://t.me/upgradeacademy_uz'>Upgrade Academy</a> o'quv markazi sizga shunday imkoniyatlardan birini taqdim qiladi, bizda siz \n1.Web dasturlash \n2.Android dasturlash \n3.Video montaj \n4.Grafik dizayn \n5.Arxitektura va dizayn \n6.Buxgalteriya \n7.SMM \nkabi mutaxassislik darslarini olishingiz mumkin.`;

// Экспорт констант
module.exports.commands = commands;
module.exports.keyboard = keyboard;
module.exports.courses = courses;
module.exports.register = register;
module.exports.courses_text = courses_text;
module.exports.courses_arr = courses_arr;

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

// const requestLocationKeyboard = {
//   reply_markup: {
//     one_time_keyboard: true,
//     keyboard: [
//       [
//         {
//           text: "My location",
//           request_location: true,
//           one_time_keyboard: true,
//         },
//       ],
//       ["Cancel"],
//     ],
//   },
// };
