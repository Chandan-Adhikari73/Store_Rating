# ⭐ Fullstack Store Rating App (Express + React + MySQL)

A **minimal, ready-to-run fullstack project** built with:  
- 🧩 **Backend:** Express.js (Node.js)  
- 🗄️ **Database:** MySQL  
- ⚛️ **Frontend:** React (Vite)  
- 🔐 **Features:** Role-based access (**ADMIN**, **OWNER**, **USER**), authentication (signup/login), and store rating (1–5 stars)

---

## 🚀 Quick Setup

### 1️⃣ MySQL Database
Create the database and run the schema:

```bash
mysql -u root -p < backend/schema.sql


### **Backend Setup**

cd backend
cp .env.example .env
npm install
npm run dev

**Frontend Setup**

cd frontend
npm install
npm run dev


| Role               | Email              | Password    |
| ------------------ | ------------------ | ----------- |
| 🛠️ **Admin**      | `admin@system.com` | `Password123!` |
| 🏪 **Store Owner** | `owner@store.com`  | `Owner@123` |
| 🙋 **User**        | `user@demo.com`    | `User@123`  |


**⚙️ Features Overview

✅ Authentication & Authorization (JWT-based)

✅ Role-based Dashboards:

Admin: Manage users, stores, and ratings

Owner: Manage their own store and view ratings

User: Rate and view stores

⭐ Store Rating System (1–5 scale)

🧠 Full validation on both frontend and backend

🧩 Modular architecture — easy to extend for production**

