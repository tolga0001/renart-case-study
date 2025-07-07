# 💍 Renart Full-Stack Case

This is a full-stack application built as part of the Renart Full-Stack Developer Internship assignment. It allows users to browse gold ring products, dynamically calculated using real-time gold prices from an external API.

---

## 🛠 Tech Stack

- **Frontend:** React (Create React App) + CSS
- **Backend:** FastAPI
- **API:** [Metals.dev](https://metals.dev/) (for live gold price)
- **Deployment:** Vercel (Frontend) + Local/Cloud FastAPI backend

---

## ⚙️ Features

### 🔹 Frontend
- Dynamic product list display with real-time price calculation
- Color selection per product (yellow, white, rose gold)
- Custom star rating component
- Filtering support (price range & popularity)
- Responsive horizontal scroll carousel
- Font & style alignment as per design brief

### 🔹 Backend
- `/products` endpoint returns a list of ring products
- Real-time price calculation based on:
