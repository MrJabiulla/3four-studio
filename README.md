# 3Four Studio — Website

A Vite + React website built with the MVVM pattern.

## Quick Start

```bash
npm install
npm run dev
```

## Font Setup (Required)

1. Download **Cera Pro** from Fontspring
2. Place font files in `/public/fonts/`:

```
public/
  fonts/
    CeraPro-Black.woff2
    CeraPro-Black.woff
    CeraPro-Bold.woff2
    CeraPro-Bold.woff
    CeraPro-Medium.woff2
    CeraPro-Medium.woff
    CeraPro-Regular.woff2
    CeraPro-Regular.woff
  logo.png        ← already included
```

The `@font-face` rules in `src/index.css` will pick them up automatically.

## Project Structure

```
3four-studio/
├── public/
│   ├── fonts/          ← place Cera Pro .woff2 files here
│   └── logo.png        ← 3Four logo
├── src/
│   ├── model.js        ← MODEL: pure data
│   ├── viewmodels.js   ← VIEW-MODELS: hooks with state & logic
│   ├── tokens.js       ← design tokens (colors, fonts, spacing)
│   ├── index.css       ← global CSS + @font-face
│   ├── App.jsx         ← root: wires VMs → Views
│   ├── main.jsx        ← entry point
│   └── components/
│       ├── Shared.jsx       ← SectionHeader, Badge, Buttons
│       ├── Nav.jsx
│       ├── Hero.jsx
│       ├── Stats.jsx
│       ├── Services.jsx
│       ├── Work.jsx
│       ├── About.jsx
│       ├── Testimonials.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
├── index.html
├── vite.config.js
└── package.json
```

## MVVM Pattern

| Layer | File | Role |
|-------|------|------|
| **Model** | `src/model.js` | Pure data — brand info, services, projects, stats |
| **ViewModel** | `src/viewmodels.js` | Hooks with state & logic — nav, contact form, testimonials |
| **View** | `src/components/*.jsx` | Dumb render components, receive VM via props |
| **Root** | `src/App.jsx` | Wires ViewModels into Views only |

## Build

```bash
npm run build    # outputs to /dist
npm run preview  # preview production build
```
