# Backend Documentation

This document describes the enhanced backend setup for your application.

## 🚀 Features Added

### Core Backend Features
- **Express.js Server** with TypeScript
- **PostgreSQL Database** with Prisma ORM
- **JWT Authentication** with bcrypt password hashing
- **Role-based Authorization** (USER, ADMIN, MODERATOR)
- **Input Validation** with Zod schemas
- **Error Handling** with custom error classes
- **Rate Limiting** for API protection
- **Security Middleware** (Helmet, CORS)
- **Request Logging** with Morgan
- **File Upload** support with Multer
- **Compression** for better performance

### API Endpoints

#### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/change-password` - Change password

#### Posts (`/api/posts`)
- `GET /api/posts` - Get all published posts (with pagination, search, filtering)
- `GET /api/posts/:id` - Get single post with comments
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (author or admin only)
- `DELETE /api/posts/:id` - Delete post (author or admin only)
- `POST /api/posts/:id/like` - Like/unlike post
- `GET /api/posts/user/me` - Get user's own posts

#### Health Check
- `GET /api/health` - Server health status

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your variables:
```bash
cp env.example .env
```

Required environment variables:
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# JWT Configuration
JWT_SECRET="your-very-secret-key"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=3001
NODE_ENV="development"

# CORS Configuration
CORS_ORIGIN="http://localhost:5173"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio for database management
npm run db:studio
```

### 4. Start Development Server
```bash
# Start the backend server
npm run dev:server

# Or start both frontend and backend
npm run dev
```

## 🗄️ Database Schema

### Users
- `id` - Unique identifier
- `email` - Email address (unique)
- `username` - Username (unique)
- `password` - Hashed password
- `firstName` - First name
- `lastName` - Last name
- `avatar` - Profile picture URL
- `role` - User role (USER, ADMIN, MODERATOR)
- `isActive` - Account status
- `createdAt` - Account creation date
- `updatedAt` - Last update date

### Posts
- `id` - Unique identifier
- `title` - Post title
- `content` - Post content
- `published` - Publication status
- `authorId` - Author reference
- `createdAt` - Creation date
- `updatedAt` - Last update date

### Comments
- `id` - Unique identifier
- `content` - Comment content
- `authorId` - Author reference
- `postId` - Post reference
- `createdAt` - Creation date
- `updatedAt` - Last update date

### Likes
- `id` - Unique identifier
- `userId` - User reference
- `postId` - Post reference
- `createdAt` - Creation date

### Tags
- `id` - Unique identifier
- `name` - Tag name (unique)
- `color` - Tag color

## 🔐 Authentication

### JWT Token Format
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "role": "USER"
}
```

### Protected Routes
Add the `Authorization` header to protected routes:
```
Authorization: Bearer <your_jwt_token>
```

### Role-based Access
- `USER` - Can create/edit own posts, like posts, comment
- `ADMIN` - Full access to all resources
- `MODERATOR` - Can moderate content

## 📝 API Examples

### Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my post.",
    "published": true
  }'
```

### Get Posts with Pagination
```bash
curl "http://localhost:3001/api/posts?page=1&limit=10&search=javascript"
```

## 🛡️ Security Features

### Rate Limiting
- 100 requests per 15 minutes per IP address
- Configurable via environment variables

### Input Validation
- All inputs validated with Zod schemas
- Automatic error responses for invalid data

### Password Security
- Passwords hashed with bcrypt (12 salt rounds)
- Secure password comparison

### CORS Protection
- Configurable CORS origins
- Credentials support for authenticated requests

### Helmet Security
- Security headers automatically added
- Protection against common vulnerabilities

## 🔧 Development

### Scripts
- `npm run dev:server` - Start development server with hot reload
- `npm run build:server` - Build server for production
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

### Error Handling
All errors are automatically caught and formatted:
```json
{
  "success": false,
  "message": "Error description",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Logging
- Development: Detailed request logging
- Production: Combined logging format
- Error logging with stack traces in development

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in production:
- `DATABASE_URL` - Production database connection
- `JWT_SECRET` - Strong secret key
- `NODE_ENV` - Set to "production"
- `CORS_ORIGIN` - Your frontend domain

### Database
- Run migrations: `npm run db:migrate`
- Generate client: `npm run db:generate`

### Build and Start
```bash
npm run build:server
npm start
```

## 📊 Monitoring

### Health Check
Monitor server health at `/api/health`:
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### Logs
- Request logs with Morgan
- Error logs with stack traces
- Database query logs in development

This backend provides a solid foundation for your application with proper authentication, authorization, data validation, and security measures. 