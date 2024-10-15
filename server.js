const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Путь к файлу, где будут храниться счетчики
const counterFilePath = path.join(__dirname, 'counters.json');

// Функция для чтения счетчиков из файла
const readCounters = () => {
  if (fs.existsSync(counterFilePath)) {
    const data = fs.readFileSync(counterFilePath);
    return JSON.parse(data);
  }
  return { index: 0, about: 0 }; // Возвращаем начальные значения, если файл не существует
};

// Функция для записи счетчиков в файл
const writeCounters = (counters) => {
  fs.writeFileSync(counterFilePath, JSON.stringify(counters, null, 2));
};

// Инициализация счетчиков
let counters = readCounters();

// Обработчик для главной страницы
app.get('/', (req, res) => {
  counters.index += 1; // Увеличиваем счетчик главной страницы
  writeCounters(counters); // Сохраняем счетчики в файл
  res.send(`<h1>Главная страница</h1><p>Количество просмотров: ${counters.index}</p><a href="/about">Перейти на страницу 'О нас'</a>`);
});

// Обработчик для страницы "О нас"
app.get('/about', (req, res) => {
  counters.about += 1; // Увеличиваем счетчик страницы "О нас"
  writeCounters(counters); // Сохраняем счетчики в файл
  res.send(`<h1>Страница "О нас"</h1><p>Количество просмотров: ${counters.about}</p><a href="/">Перейти на главную страницу</a>`);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
