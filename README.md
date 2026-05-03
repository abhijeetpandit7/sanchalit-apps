<h1 align="center">
  <a href="https://sanchalithome.netlify.app/" target="_blank" rel="noopener noreferrer">
    <img src=".github/assets/sanchalit.png" width="50%" alt="Sanchalit's website" style="border-radius: 24px">
  </a>
</h1>

<!-- [![GitHub license](https://img.shields.io/github/license/abhijeetpandit7/sanchalit-apps)](https://github.com/abhijeetpandit7/sanchalit-apps/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/abhijeetpandit7/sanchalit-apps)](https://github.com/abhijeetpandit7/sanchalit-apps/issues)
[![GitHub stars](https://img.shields.io/github/stars/abhijeetpandit7/sanchalit-apps)](https://github.com/abhijeetpandit7/sanchalit-apps/stargazers) -->

Sanchalit is a home page for your Internet browser.<br>
Transform your New Tab into a focused, inspiring workspace. Here's some features:

- 🖼️ Dynamic backgrounds and photo info
- 🕰️ Customizable clock (12/24h formats)
- 🔎 Search bar with multiple providers
- 📝 Quick notes with fullscreen support
- 🔖 Bookmarks, and top sites
- 🎧 Soundscapes with ambient tracks, and custom audio
- ✅ Todo lists with colors, drag-and-drop, and archives
- ⏱️ Countdowns
- 💭 Daily quotes
- 👋 Greets you by your name
- 🌘 Dark mode

## 🚀 Install Sanchalit!

Sanchalit is currently available for manual installation. You can build it for Chromium, Firefox, Safari. See the [Running Sanchalit](#running-sanchalit) section below for instructions on how to load it in your browser.<br>
You can also [try it online 🌎](https://sanchalit.netlify.app) before installing.

## 👋 Get in touch

If you want to discuss ideas, features, or bug reports, feel free to open an issue or start a discussion in our GitHub repository!

## 🔧 Built with

- React, Webpack & Babel
- Workbox (Service Workers & Caching)
- No frameworks, purely Javascript

## 👀 Authors

- Abhijeet Pandit · [GitHub](https://github.com/abhijeetpandit7)

## 👨‍💻 Running Sanchalit

If you wish to self-host the APIs used by Sanchalit, you can do so by following the steps in [Sanchalit API repository](https://github.com/abhijeetpandit7/sanchalit-api).

### Run locally

- Clone this repository
- Install dependencies
- Build Sanchalit

```bash
# In root directory
npm install

# To build the extension for different platforms, run the corresponding command:
npm build build:chromium
npm build build:firefox
npm build build:safari
npm build build:web
```

#### Chromium

- Go to `chrome://extensions`
- Enable Developer mode
- Click "Load unpacked" and select the `/dist/chromium` folder

#### Edge

- Go to `edge://extensions`
- Enable Developer mode
- Click "Load unpacked" and select the `/dist/chromium` folder

#### Firefox

- Go to `about:debugging#/runtime/this-firefox`
- Click "Load Temporary Add-on"
- Select the `manifest.json` file in the `/dist/firefox` folder

#### Online (web version)

- A live server opens with: `npm run dev:web`
- Go to http://localhost:3000

#### Safari

- Make sure `./release/safari` exists with the necessary files.
- Launch Xcode. On the launcher, select: "Clone git repository..."
- Add a reference of the build created in `release/safari` to `Shared (Extension)`
- Build sanchalitStartpage for (macOS) or (iOS). A window with instructions should appear.

#### MacOS development build

-   In Safari status bar, got to Safari > Preferences > Advanced tab
-   Show Develop menu in menu bar
-   Develop > Allow Unsigned Extensions
