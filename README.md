# Конвертер валют 
Конвертер валют — одностраничное приложение для конвертации валют на React. Проект демонстрирует работу с актуальными курсами валют, историческими данными, графиками и использованием Frankfurter API.

## Основные возможности
- Конвертация валют в реальном времени
- аблица курсов валют с поиском и сортировкой
- Графики динамики курсов за период
- Локальная конвертация без запросов к API
- История конвертаций с сохранением в localStorage
- Адаптивная верстка с TailwindCSS
- Прокси-сервер для обхода CORS при разработке
- Обработка ошибок и уведомления

## Технологии и зависимости
- React 19
- PrimeReact (UI-компоненты)
- TailwindCSS (стили)
- Recharts (графики)
- Webpack (сборка)
- Express (прокси-сервер)
- date-fns (работа с датами)
- lodash (утилиты)
- Jest 30.0.4 (тестирование, в реализации) 
- Frankfurter API (данные о курсах валют)

## Архитектура MVC
### Model
- `CurrencyModel.js` — работа с валютами и курсами
- `ConversionModel.js` — логика конвертации
- `HistoryModel.js` — управление историей операций
- `ChartModel.js` — подготовка данных для графиков
- `api/exchangeRateApi.js` — взаимодействие с Frankfurter API

### View
- `components/Converter/` — форма конвертации
- `components/Rates/` — таблица курсов валют
- `components/Charts/` — компоненты графиков
- `components/History/` — история операций
- `components/Common/` — общие компоненты
- `components/Layout/` — шапка, подвал, навигация
- `pages/` — страницы приложения

### Controller
- `hooks/` — кастомные хуки для управления состоянием
- `context/` — React Context для глобального состояния

## Структура проекта
currency-converter/
  public/
    index.html
  src/
    model/
      CurrencyModel.js
      ConversionModel.js
      HistoryModel.js
      ChartModel.js
      api/
        exchangeRateApi.js
    view/
      components/
        Converter/
        Rates/
        Charts/
        History/
        Common/
        Layout/
      pages/
        HomePage.jsx
        RatesPage.jsx
        ChartPage.jsx
        HistoryPage.jsx
      controller/
        hooks/
        context/
      utils/
      styles/
        index.css
      App.jsx
      index.js
      tests/ # в реализации 
        model/
        controller/
        view/
  proxy-server.js                  # Прокси-сервер для разработки
  webpack.config.js
  postcss.config.js
  tailwind.config.js
  babel.config.js
  jest.config.js
  package.json
  package-lock.json
  README.md

## Скрипты
- `npm start` — запуск dev-сервера webpack с автоматическим открытием браузера
- `npm run build` — сборка production-версии
- `npm run serve` — запуск production-сборки локально
- `npm run proxy` — запуск прокси-сервера для разработки (порт 3001)
- `npm run deploy` — сборка и деплой на GitHub Pages
- `npm test` — запуск тестов

## Быстрый старт
### Локальная разработка с прокси-сервером
1. Установите зависимости:
   ```
   npm install
   ```

2. Запустите прокси-сервер (для обхода CORS):
   ```
   npm run proxy
   ```

3. В новом терминале запустите приложение:
   ```
   npm test
   ```

  Приложение будет доступно по адресу: http://localhost:3000

4. Соберите production-версию:
   ```
   npm run build
   ```

5. Деплой на GitHub Pages:
   ```
   npm run deploy
   ```

## Страницы приложения
### Главная страница (HomePage)
- Форма конвертации валют
- Быстрые действия (популярные пары)
- Мини-таблица популярных курсов
- Переключатель темы
### Страница курсов (RatesPage)
- Таблица всех валютных курсов
- Поиск и сортировка
- Статистика по валютам
### Страница графиков (ChartPage)
- Графики динамики курсов
- Выбор периода и типа графика
- Детальная информация по курсам
### Страница истории (HistoryPage)
- История всех конвертаций
-Фильтры и поиск
- Возможность повторить или удалить операцию

## API
Проект использует Frankfurter API для получения актуальных курсов валют.
Основные эндпоинты:
- GET /latest — текущие курсы валют
- GET /currencies — список всех валют
- GET /historical — исторические данные
- GET /timeseries — данные за период

## Тестирование
Проект будет включать тесты, но пока в реализации.
Запуск тестов:
   ```
   npm test
   ```

## Особенности реализации
- Чистая архитектура MVC
- Локальное хранение истории в localStorage
- Адаптивный дизайн с TailwindCSS
- Поддержка темной/светлой темы
- Обработка ошибок сети и API
- Оптимизация производительности
