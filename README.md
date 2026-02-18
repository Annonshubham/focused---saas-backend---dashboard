# 🚀 FocusEd SaaS Backend

A full-stack SaaS backend built using Node.js, Express, TypeScript, and MongoDB.

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication

## ✨ Features

- User Registration & Login
- JWT-based Authentication
- Protected Routes
- CRUD APIs for Goals
- Middleware-based Error Handling
- Modular Folder Structure

## 📁 Project Structure

server/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── utils/
 └── server.ts

## ⚙️ Setup Instructions

1. Clone the repository

   git clone https://github.com/yourusername/yourrepo.git

2. Install dependencies

   npm install

3. Create a `.env` file inside the `server` folder and add:

   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Run the development server

   npm run dev

## 📌 Future Improvements

- Role-based authentication
- API rate limiting
- Deployment on Render/Railway
- Swagger documentation
