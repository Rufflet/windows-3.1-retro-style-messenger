# Мессенджер для Яндекс.Практикума

[![Netlify Status](https://api.netlify.com/api/v1/badges/7cb64050-b8e5-4911-b6a1-d8ca851c7ea2/deploy-status)](https://app.netlify.com/sites/sensational-torte-1795ab/deploys)
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&style=flat)](https://retro-messenger.herokuapp.com)

[Demo (Heroku)](https://retro-messenger.herokuapp.com) | [Demo (Netlify)](https://sensational-torte-1795ab.netlify.app/) | [Figma](https://www.figma.com/file/TzzWQOaqd8WQ3lo8muPKFN/Messenger)

## Установка

Клонируйте репозиторий:

```sh
git clone https://github.com/rufflet/middle.messenger.praktikum.yandex.git -b sprint_1
```

Установите зависимости:

```sh
npm install
```

## Сборка и Hot-Reload для разработки

```sh
npm run dev
```

## Сборка и минификация для продакшена

```sh
npm run build
```


## Запуск проекта:

```sh
npm run start
```

Проект будет доступен по ссылке: http://localhost:3000

## Доступные страницы:
-----
* [Cover](https://sensational-torte-1795ab.netlify.app)
* [Login](https://sensational-torte-1795ab.netlify.app/signin)
* [Registration](https://sensational-torte-1795ab.netlify.app/signup)
* [Messenger](https://sensational-torte-1795ab.netlify.app/messenger)
* [Profile](https://sensational-torte-1795ab.netlify.app/profile)
* [Profile edit](https://sensational-torte-1795ab.netlify.app/profile/edit)
* [Password edit](https://sensational-torte-1795ab.netlify.app/profile/password-change)
* [404 Error](https://sensational-torte-1795ab.netlify.app/error/404)
* [500 Error](https://sensational-torte-1795ab.netlify.app/error/500)

## Changelog:
### 4 Спринт:
- внедрён Webpack вместо Parcel
- добавлен precommit (Husky)
- настроена Docker-сборка приложения
- проект размещён в Heroku

### 3 Спринт:
- добавлен роутинг
- внедрено API чатов, авторизации и пользователей
- подключен WebSocket для работы real-time сообщений

### 2 Спринт:
- внедрён TypeScript
- добавлена страница с лентой переписки
- рефакторинг с использованием компонентного подхода (Block и EventBus)
- выделены компоненты (`src/components`) и страницы (`src/views`)
- добавлена валидация форм для страниц авторизации, регистрации, отправки сообщений и настроек пользователя
- генерация страниц теперь на стороне клиента
- добавлен класс для работы с запросами (`src/core/HTTPTransport.ts`)
- добавлены анализаторы кода ESLint и Stylelint
