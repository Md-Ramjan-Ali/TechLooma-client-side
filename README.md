# 🛰️ TechLooma – A Tech Launch Platform

**🔗 Live Site**: [https://TechLooma.tech](https://TechLooma.tech)  
**📁 Client Repository**: [https://github.com/Md-Ramjan-Ali/TechLooma-Client](https://github.com/Md-Ramjan-Ali/TechLooma-Client)  
**📁 Server Repository**: [https://github.com/Md-Ramjan-Ali/TechLooma-Server](https://github.com/Md-Ramjan-Ali/TechLooma-Server)


---

## 📌 Project Purpose

**TechLooma** is a full-stack MERN web application inspired by platforms like Product Hunt. It enables users to discover, launch, and promote tech products. Users can vote, review, subscribe, and report products, while moderators and admins manage content, users, and statistics.

---

## 🚀 Key Features

### 🧑‍💻 User Features
- 🔐 Firebase Authentication (Email & Social Login)
- 🚀 Launch a product with rich details and tags
- 👍 Vote & 💬 Review products
- 💳 Subscribe to Pro Membership via **Stripe**
- 🎟️ Use discount coupons
- 📋 Manage profile and edit account info

### 🧑‍⚖️ Moderator Features
- 🛠️ Review and approve/reject new product submissions
- 👀 View reported content
- 🌟 Mark products as featured

### 👑 Admin Features
- 🧑‍💼 Role Management (Make Admin/Moderator)
- 📈 Admin Dashboard with site statistics
- 💸 Manage discount coupons (Add/Edit/Delete)
- 📊 Visual insights using **Chart.js** and **Recharts**

### 💡 Additional Features
- 🔍 Advanced search and tag filtering
- 🔄 Dynamic routing with protected/private routes
- 🧙 Smooth animation using **Framer Motion** & **Lottie**
- 🎨 Responsive and consistent UI with **Tailwind CSS**
- 🧠 Optimized data fetching using **TanStack Query**

---

## 📦 NPM Packages Used

| Package                            | Purpose                                           |
|------------------------------------|---------------------------------------------------|
| `@react-icons/all-files`           | Icon rendering (tree-shakable)                    |
| `@stripe/react-stripe-js` & `@stripe/stripe-js` | Stripe payment integration          |
| `@tailwindcss/vite`                | Tailwind CSS support for Vite                     |
| `@tanstack/react-query`            | Server-state management & caching                 |
| `axios`                            | API calls                                         |
| `chart.js`, `chartjs-plugin-datalabels` | Admin data visualization                     |
| `firebase`                         | Authentication and Firestore                      |
| `framer-motion`                    | Animation                                         |
| `lottie-react`, `react-lottie-player` | Lottie animations                             |
| `react`, `react-dom`              | Core React libraries                              |
| `react-chartjs-2`                  | React wrapper for Chart.js                        |
| `react-dnd`, `react-dnd-html5-backend` | Drag-and-drop support                         |
| `react-helmet-async`              | Dynamic page titles                               |
| `react-hook-form`                  | Form handling                                     |
| `react-icons`                      | Vector icons                                      |
| `react-is`                         | React internal type checking                      |
| `react-rating`                     | Product star ratings                              |
| `react-router`                     | Client-side routing                               |
| `react-simple-typewriter`         | Typing animation                                  |
| `react-tag-input`                  | Tag input for product creation                    |
| `react-toastify`                   | Toast notifications                               |
| `react-tooltip`                    | Tooltips                                          |
| `recharts`                         | Dashboard visualizations                          |
| `sweetalert2`                      | Beautiful alert modals                            |
| `swiper`                           | Responsive product/coupon carousel                |

---

## 🧠 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite, TanStack Query
- **Backend**: Express.js, MongoDB, Firebase Admin SDK
- **Authentication**: Firebase Auth, JWT
- **Payments**: Stripe
- **Hosting**: Vercel (Frontend), Render (Backend or your choice)

---

## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TechLooma.git
   cd TechLooma
