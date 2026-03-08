# 🚀 Portfolio CMS API

A full-featured **Content Management System** backend for portfolio websites, built with **Node.js**, **Express.js**, and **MongoDB**.

## ✨ Features

- ✅ JWT Authentication (Register/Login)
- ✅ Role-based access control (Admin & Editor)
- ✅ CRUD for Posts, Categories, Users, Media
- ✅ Image upload with Multer
- ✅ Pagination & Search
- ✅ Dashboard statistics API
- ✅ Swagger API documentation
- ✅ Input validation (express-validator)
- ✅ Error handling middleware
- ✅ Request logging

## 📁 Project Structure

```
project/
├── config/
│   ├── db.js              # MongoDB connection
│   └── swagger.js         # Swagger configuration
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── dashboardController.js
│   ├── mediaController.js
│   ├── postController.js
│   └── userController.js
├── middleware/
│   ├── auth.js            # JWT protect & authorize
│   ├── errorHandler.js    # Centralized error handler
│   ├── logger.js          # Request logging
│   ├── upload.js          # Multer image upload
│   └── validate.js        # express-validator checker
├── models/
│   ├── Category.js
│   ├── Media.js
│   ├── Post.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── dashboardRoutes.js
│   ├── mediaRoutes.js
│   ├── postRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── ApiError.js
│   └── apiResponse.js
├── uploads/               # Uploaded images
├── .env                   # Environment variables
├── app.js                 # Express app setup
├── server.js              # Entry point
├── seed.js                # Sample data seeder
└── package.json
```

## 🛠️ Installation

### Prerequisites
- **Node.js** v18+
- **MongoDB** (running locally or MongoDB Atlas)

### Steps

```bash
# 1. Clone or navigate to project
cd d:/Work/BE

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Edit .env file with your MongoDB URI and JWT secret

# 4. Seed sample data (optional)
npm run seed

# 5. Start development server
npm run dev

# 6. Start production server
npm start
```

### Environment Variables (`.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb://localhost:27017/portfolio_cms` | MongoDB connection string |
| `JWT_SECRET` | — | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | `7d` | JWT expiration time |
| `NODE_ENV` | `development` | Environment mode |

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Login & get token |
| `GET` | `/api/auth/me` | Private | Get current user |

### 👥 Users (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create user |
| `PUT` | `/api/users/:id` | Update user |
| `DELETE` | `/api/users/:id` | Delete user |

### 📝 Posts
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/posts` | Public | Get all posts (paginated) |
| `GET` | `/api/posts/:id` | Public | Get post by ID |
| `POST` | `/api/posts` | Private | Create post |
| `PUT` | `/api/posts/:id` | Private | Update post |
| `DELETE` | `/api/posts/:id` | Private | Delete post |

**Query Parameters:** `?page=1&limit=10&search=react&status=published&category=ID&tag=nodejs`

### 📂 Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/categories` | Public | Get all categories |
| `GET` | `/api/categories/:id` | Public | Get category by ID |
| `POST` | `/api/categories` | Admin | Create category |
| `PUT` | `/api/categories/:id` | Admin | Update category |
| `DELETE` | `/api/categories/:id` | Admin | Delete category |

### 🖼️ Media
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/media/upload` | Private | Upload image |
| `GET` | `/api/media` | Private | Get all media |
| `GET` | `/api/media/:id` | Private | Get media by ID |
| `DELETE` | `/api/media/:id` | Admin | Delete media |

### 📊 Dashboard
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/dashboard` | Private | Get stats |

## 📖 Swagger Documentation

After starting the server, visit: **http://localhost:5000/api-docs**

## 🌱 Seed Data

```bash
npm run seed
```

Creates sample data with credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@portfolio.com` | `admin123` |
| **Editor** | `editor@portfolio.com` | `editor123` |

Plus 5 categories and 8 sample posts.

## 🔒 Authentication

Use the JWT token from login in the `Authorization` header:

```
Authorization: Bearer <your-token>
```

## 📜 License

ISC
