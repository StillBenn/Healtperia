# Treatperia

**Treatperia** is an international healthcare library — a premium, multilingual web platform that connects patients with trusted clinics, doctors, agencies, hospitals, and treatments worldwide.

🔗 **Live site (GitHub Pages):** https://stillbenn.github.io/Healtperia/

## Features

- Full-screen background video hero with a premium dark-blue identity
- Five index categories: Treatment, Doctor, Hospital, Clinic, and Agency
- Dedicated index pages with search/filter placeholders and result cards
- Language selector with **20 languages** and `localStorage` persistence
- Live, JavaScript-driven UI translations (no external API)
- Responsive layout for desktop, tablet, and mobile
- Smooth scroll reveal animations and a mobile-app showcase section

## Project Structure

```
Healtperia/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── ANASAYFA.jpg
│   │   ├── LOGO__SLOGANLI_PNG.png
│   │   └── LOGO_SLOGANLI.jpg
│   └── videos/
│       └── MAIN_PAGE_VIDEO.mp4
├── pages/
│   ├── treatment-index.html
│   ├── doctor-index.html
│   ├── hospital-index.html
│   ├── clinic-index.html
│   └── agency-index.html
└── README.md
```

## Tech Stack

Plain **HTML5**, **CSS3**, and **vanilla JavaScript** — no build step or framework. Hosted on **GitHub Pages**.

## Running Locally

Clone the repository and open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```
