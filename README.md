# 📝 Blog Platform

A full-stack blog platform built with React, Express.js, and MongoDB. This application allows users to create, read, update, and delete blog posts, as well as comment on posts and manage user authentication.

## 🚀 Live Demo

**[https://blog-2-eight-lake.vercel.app](https://blog-2-eight-lake.vercel.app)**

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **TailwindCSS** 4.1.18 - Utility-first CSS framework
- **React Router** 7.12.0 - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library
- **Day.js** - Date manipulation library
- **JWT Decode** - JWT token decoding

### Backend
- **Express.js** 5.2.1 - Web framework
- **MongoDB** with **Mongoose** 9.1.4 - Database and ODM
- **JWT** (jsonwebtoken) - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
blog website/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React context (AuthContext)
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS styles
│   │   ├── main.jsx       # Application entry point
│   │   └── root.jsx       # Root component with routing
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Express backend API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware (auth, validation)
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── validators/    # Input validation
│   │   └── server.js      # Server entry point
│   └── package.json
│
└── README.md
```

## ✨ Features

- 🔐 **User Authentication** - Register, login, and JWT-based authentication
- 📝 **Blog Posts** - Create, read, update, and delete blog posts
- 💬 **Comments** - Add comments to blog posts
- 🔍 **Search & Pagination** - Search posts and paginated results
- 👤 **User Profiles** - View user profiles and their posts
- 🎨 **Responsive Design** - Mobile-friendly UI with TailwindCSS
- 🔒 **Protected Routes** - Authentication-required pages

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tyasweningas/blog.git
   cd blog
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/blog?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

> **Note**: Replace `your-username`, `your-password`, and the MongoDB cluster URL with your actual MongoDB credentials.

#### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API URL
VITE_API_URL=http://localhost:5000/api
```

### Running Locally

#### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 2. Start the Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

#### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 👤 Author

**Tyasweningas**
- GitHub: [@Tyasweningas](https://github.com/Tyasweningas)
