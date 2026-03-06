# 🍽️ Food Stall Tracker (MERN Stack Project)

## 📖 Project Overview

Food Stall Tracker is a full-stack MERN application developed to manage and track food stalls.  
This project allows users to add, view, update, and delete food stall information easily.

The main objective of this project is to understand and implement MERN stack concepts such as:
- REST APIs
- MongoDB database integration
- React frontend development
- Backend deployment
- API integration using Axios

This project was developed as part of the MERN lab evaluation.

---

## 🚀 Live Project Links

Frontend (Render):
https://food-stall-tracker-1.onrender.com

Backend (Render):
https://food-stall-tracker.onrender.com/food/stalls

---

## 🛠️ Technologies Used

### Frontend:
- React (Vite)
- Axios
- Tailwind CSS
- DaisyUI

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment:
- GitHub
- Render.com

---

## ✨ Features Implemented

### 1️⃣ Add New Food Stall
User can add new food stall details including:
- Stall Name
- Owner Name
- Contact Number
- Location
-Foods
-Price of Foods
-Image
-Description
-Opening Time
-Closing Time
-Weekly Of

### 2️⃣ View All Food Stalls
All added stalls are displayed dynamically from MongoDB database.

### 3️⃣ Update Stall Information
Existing stall data can be edited and updated.

### 4️⃣ Delete Stall
User can delete a stall from the database.

### 5️⃣ Responsive UI
The frontend is responsive and works properly on desktop and mobile devices.


### 6️⃣ Additional Features
1. Search Stall By Stall name
2. Filter shop by entering food name and location
3. By Choosing Rating we can get the shop name

---

## 📂 Project Structure


Food-Stall-Tracker/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── server.js
│ └── package.json


├── frontend/
├──public/
│ ├── src/
│ ├── components/
│ ├── axios.js
│ ├── vite.config.js
│ └── package.json


---

## ⚙️ Installation & Setup Instructions

### Step 1: Clone the Repository


git clone https://github.com/your-username/Food-Stall-Tracker.git


---

### Step 2: Backend Setup


cd backend
npm install


Create a `.env` file and add:


MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend:


npm start


---

### Step 3: Frontend Setup


cd frontend
npm install
npm run dev


For production build:


npm run build


---

## 🔗 API Endpoints

- GET /food/stalls → Get all stalls
- POST /food/stalls → Add new stall
- PUT /food/stalls/:id → Update stall
- DELETE /food/stalls/:id → Delete stall

---

## 📌 Concepts Used in This Project

- REST API creation
- Express routing
- MongoDB CRUD operations
- Mongoose schema and models
- Axios for API calls
- Environment variables
- Deployment using Render
- Version control using GitHub

---

## 📚 Learning Outcome

Through this project, I learned:

- How frontend and backend communicate using APIs
- How to deploy backend and frontend separately
- How to connect MongoDB Atlas with a live server
- How to manage project structure properly

---

## 👨‍💻 Developed By

Mohit Roshan Mishra  
SYCS  
Batch B3
Roll no:-59
MERN Project  

2026


