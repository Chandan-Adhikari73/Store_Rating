# ⭐ Fullstack Store Rating App (Express + React + MySQL)

A minimal, ready-to-run fullstack project built with:

* 🧩 **Backend:** Express.js (Node.js)
* 🗄️ **Database:** MySQL
* ⚛️ **Frontend:** React (Vite)
* 🔐 **Features:** Role-based access (**ADMIN**, **OWNER**, **USER**), authentication (signup/login), and store rating (1–5 stars)

---

## 🚀 Quick Setup

### 1️⃣ MySQL Database

Create the database and run the schema:

```bash
mysql -u root -p < backend/schema.sql
```

---

### 2️⃣ Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

* Default backend URL: **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

* Default frontend URL: **[http://localhost:5173](http://localhost:5173)**

---

## 👤 Default Seeded Accounts

| Role               | Email              | Password       |
| ------------------ | ------------------ | -------------- |
| 🛠️ **Admin**      | `admin@system.com` | `Password123!` |
| 🏪 **Store Owner** | `owner@store.com` | `Password123!` |
| 🙋 **User**        | `chandan@gmail.com`   | `800.510*8673aC`     |

---

## ⚙️ Features Overview

* ✅ **Authentication & Authorization** (JWT-based)
* ✅ **Role-based Dashboards**:

  * **Admin:** Manage users, stores, and ratings
  * **Owner:** Manage their own store and view ratings
  * **User:** Rate and view stores
* ⭐ **Store Rating System** (1–5 scale)
* 🧠 **Full validation** on both frontend and backend
* 🧩 **Modular architecture** — easy to extend for production
* 🎨 **Responsive UI** built with React + Tailwind (Vite)

---

## 📁 Project Structure

```
.
├── backend
│   ├── schema.sql
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
└── frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

## 📝 API Endpoints (Example)

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/api/auth/signup`     | Register new user         |
| POST   | `/api/auth/login`      | Login and get JWT         |
| GET    | `/api/stores`          | List all stores           |
| GET    | `/api/stores/:id`      | Get store details         |
| POST   | `/api/stores/:id/rate` | Rate a store (1–5)        |
| GET    | `/api/dashboard`       | Role-based dashboard data |

> All endpoints are protected with JWT and role-based access control where applicable.

---

<img width="1920" height="1080" alt="Screenshot (11)" src="https://github.com/user-attachments/assets/d60d1dc9-cf97-40d0-8977-3c61b076b980" />

<img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/a43f56c0-721d-4e38-a896-d12a7eda4dc4" />
<img width="1920" height="1080" alt="Screenshot (16)" src="https://github.com/user-attachments/assets/8d268f96-947d-42f1-ae46-e12171d6a64d" />
<img width="1920" height="1080" alt="Screenshot (17)" src="https://github.com/user-attachments/assets/13c333ac-f969-41dd-a72d-1fea7a907382" />
