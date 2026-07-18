<div align="center">

# 🧵 Behbod Leather — چرم بهبد

**A modern, responsive e-commerce landing page for handcrafted Persian leather goods.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](#)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)
[![RTL Support](https://img.shields.io/badge/Layout-RTL%20%2F%20Farsi-5a2d0c?style=flat)](#)

</div>

---

## Overview

**Behbod Leather** is a fully static, dependency-light storefront built to showcase handmade Persian leather products — wallets, handbags, belts, briefcases, and accessories. It's designed as a production-ready front-end template: no build step, no framework, no backend required — just open `index.html` and it works.

The UI is fully right-to-left (RTL) and localized in Persian (Farsi), with Persian-formatted currency and numerals, making it a solid reference implementation for RTL e-commerce interfaces.

**[Live Demo](#) · [Report a Bug](#) · [Request a Feature](#)**

---

## ✨ Features

| Category | Details |
|---|---|
| 🛍️ **Product Catalog** | Filterable grid by category (wallets, handbags, belts, accessories) with live search |
| 🛒 **Shopping Cart** | Add/remove items, adjust quantities, persistent via `localStorage`, running total in Toman |
| 👁️ **Quick View** | Modal product preview without leaving the page |
| ❤️ **Wishlist** | Persistent favorites with restored state across sessions |
| 🌗 **Dark / Light Mode** | Theme toggle with saved user preference |
| 📱 **Fully Responsive** | Mobile-first layout, collapsible nav, adaptive search bar |
| ⚡ **Scroll Animations** | Powered by ScrollReveal, with graceful fallback if the CDN is unavailable |
| 📦 **PWA-Ready** | Installable via `manifest.json` with app icons for mobile home screens |
| ♿ **Accessible Markup** | Semantic HTML, `aria-hidden` states, descriptive `alt` text throughout |
| 🎨 **Self-Contained Assets** | All imagery is local, hand-crafted SVG — no broken links, no external hotlinking |

---

## 🛠️ Tech Stack

- **Markup:** Semantic HTML5
- **Styling:** Vanilla CSS3 (custom properties, CSS Grid/Flexbox, media queries)
- **Behavior:** Vanilla JavaScript (ES6+, no framework dependencies)
- **Icons:** [Remix Icon](https://remixicon.com/)
- **Typography:** [Vazirmatn](https://github.com/rastikerdar/vazirmatn) (Google Fonts)
- **Animation:** [ScrollReveal](https://scrollrevealjs.org/)

No build tools, bundlers, or package managers are required to run this project.

---

## 📂 Project Structure

```
bhb/
├── index.html                  Main landing page
├── style.css                   Complete styling (theming, responsive breakpoints)
├── main.js                     Cart, filtering, search, theming, wishlist logic
├── manifest.json                PWA configuration
├── README.md
└── images/
    ├── logo.png                 Brand logo
    ├── icon-192.png             PWA icon (192×192)
    ├── icon-512.png             PWA icon (512×512)
    ├── favicon-32.png
    ├── apple-touch-icon.png
    ├── hero-illustration.svg
    ├── about-illustration.svg
    ├── avatar-1/2/3.svg         Testimonial avatars
    └── products/
        ├── wallet.svg
        ├── handbag.svg
        ├── belt.svg
        ├── keychain.svg
        ├── briefcase.svg
        └── shoulderbag.svg
```

---

## 🚀 Getting Started

### Prerequisites

Nothing but a modern web browser. For local development with a live server (recommended, to avoid CORS issues with `fetch`/module loading in future extensions):

- Python 3, **or**
- Node.js, **or**
- any static file server

### Installation

```bash
git clone https://github.com/<your-username>/behbod-leather.git
cd behbod-leather/bhb
```

### Run locally

```bash
# Using Python
python3 -m http.server 8000

# Using Node (http-server)
npx http-server -p 8000
```

Then open **http://localhost:8000** in your browser.

### Deployment

This is a static site — deploy it anywhere that serves static files:

- **GitHub Pages:** push the `bhb/` contents to a `gh-pages` branch or enable Pages on `main`
- **Netlify / Vercel:** drag-and-drop the `bhb/` folder or connect the repo directly
- Any CDN, S3 bucket, or Nginx/Apache static host

---

## 🗺️ Roadmap

- [ ] Connect checkout flow to a real payment gateway
- [ ] Replace placeholder contact details with production values
- [ ] Add a real product photography set (drop-in replacements in `images/products/`)
- [ ] Backend integration for inventory and order management
- [ ] Multi-language support (English/Persian toggle)
- [ ] Unit/E2E test coverage

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [Remix Icon](https://remixicon.com/) for the icon set
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn) for Persian typography
- [ScrollReveal](https://scrollrevealjs.org/) for scroll-based animations

<div align="center">

Made with 🤎 for Persian handcrafted leather artistry.

</div>
