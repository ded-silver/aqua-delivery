# Aqua Delivery — Тестовое задание

Тестовый проект для компании Aqua Delivery.

## Стек технологий

- React + TypeScript
- Ant Design — UI-компоненты
- React Final Form — формы
- Axios — HTTP-запросы
- React Router DOM — маршрутизация
- Архитектура: Feature-Sliced Design (FSD)

## Основной функционал

- Авторизация по логину и паролю
- Отображение сообщений из API
- Подсветка пользовательских сообщений (зеленым цветом)
- Адаптивная таблица с сортировкой и стилями
- Обработка ошибок авторизации

## Структура проекта (FSD)

```bash
src/
├── app/            # Инициализация приложения
├── entities/       # Базовые сущности (message)
├── pages/          # Страницы (login, messages)
├── shared/         # Переиспользуемые модули (api, config, ui)
├── styles/         # Общие стили
└── index.tsx       # Точка входа
```

## Установка и запуск

```bash
git clone https://github.com/ded-silver/aqua-delivery.git
cd aqua-delivery
npm install
npm run start