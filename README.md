# Windows 3.1 Retro Messenger

A messenger UI styled after classic **Windows 3.1**, built as a vanilla TypeScript SPA with a custom component layer (Block + Handlebars), client-side routing, and an in-browser mock backend — so the demo runs fully statically on **GitHub Pages**.

**Demo:** [https://rufflet.github.io/windows-3.1-retro-style-messenger/](https://rufflet.github.io/windows-3.1-retro-style-messenger/)

## Stack

- TypeScript, Webpack 5
- Custom `Block` / `EventBus` / `Router` / `Store`
- Handlebars templates
- Client-side mock API + Fake WebSocket (`localStorage` persistence)
- Jest unit tests

## Quick start

```sh
git clone https://github.com/Rufflet/windows-3.1-retro-style-messenger.git
cd windows-3.1-retro-style-messenger
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo account

After first load the mock DB is seeded. Sign in with:

- **login:** `demo`
- **password:** `12345`

Or register a new local user (data stays in your browser’s `localStorage`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Webpack dev server with HMR |
| `npm run build` | Production build → `dist/` (+ `404.html` for SPA) |
| `npm run build:gh-pages` | Production build with GitHub Pages `publicPath` |
| `npm start` | Build and serve `dist` via Express |
| `npm test` | Jest |
| `npm run lint` | ESLint |
| `npm run stylelint` | Stylelint |

## Pages

- `/` — cover
- `/signin` / `/signup` — auth
- `/messenger` — chats (auth required)
- `/profile`, `/profile/edit`, `/profile/password-change`
- `/error/404`, `/error/500`

## How the mock backend works

REST calls go through `MockTransport` (same `{ response }` shape as the XHR client). Chat realtime uses `FakeWebSocket` with the original message protocol (`get old` / `message` / `ping`). Seed contacts reply automatically. Everything persists in `localStorage` under `win31-messenger-db`.

## Deploy (GitHub Pages)

Push to the `portfolio` branch; the GitHub Actions workflow builds with:

`PUBLIC_PATH=/windows-3.1-retro-style-messenger/`

and deploys via GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions** once if it is not already on.
