# Frontend-Backend Integration Guide

## Overview

This project now includes a complete frontend-backend integration with authentication, user management, and API testing capabilities. The frontend is built with React + TypeScript and communicates with a Node.js/Express backend.

## Backend Usage in This Project

### 1. **Authentication System**
- **Location**: `server/routes/auth.ts`
- **Endpoints**:
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `GET /api/auth/me` - Get current user profile
  - `PUT /api/auth/me` - Update user profile
  - `PUT /api/auth/change-password` - Change password

### 2. **Posts Management**
- **Location**: `server/routes/posts.ts`
- **Endpoints**:
  - `GET /api/posts` - Get all posts
  - `POST /api/posts` - Create new post
  - `PUT /api/posts/:id` - Update post
  - `DELETE /api/posts/:id` - Delete post

### 3. **Database Schema**
- **Location**: `prisma/schema.prisma`
- **Models**: User, Post, Comment, Like, Tag

### 4. **Health Check**
- **Location**: `server/index.ts`
- **Endpoint**: `GET /api/health` - Server health status

## Frontend Components

### 1. **Authentication Context**
- **Location**: `client/contexts/AuthContext.tsx`
- **Purpose**: Manages user authentication state across the app

### 2. **API Service Layer**
- **Location**: `client/lib/api.ts`
- **Purpose**: Handles all backend API communication

### 3. **Login Page**
- **Location**: `client/pages/Login.tsx`
- **Features**: Login and registration forms with validation

### 4. **Dashboard**
- **Location**: `client/pages/Dashboard.tsx`
- **Features**: 
  - User profile management
  - Posts CRUD operations
  - API health monitoring
  - Backend testing interface

### 5. **Protected Routes**
- **Location**: `client/components/ProtectedRoute.tsx`
- **Purpose**: Guards routes that require authentication

## Setup Instructions

### 1. **Backend Setup**

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your database and JWT configuration

# Set up database
npm run db:generate
npm run db:migrate

# Start the backend server
npm run dev:server
```

### 2. **Frontend Setup**

```bash
# Install dependencies (already done)
npm install

# Create environment file for frontend
echo "VITE_API_URL=http://localhost:3001/api" > client/.env

# Start the frontend development server
npm run dev
```

### 3. **Database Setup**

Make sure you have PostgreSQL running and update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

## Testing the Integration

### 1. **Health Check**
- Visit `http://localhost:3001/api/health` to verify backend is running
- Check the "API Status" tab in the dashboard

### 2. **Authentication Flow**
1. Navigate to `/login` or click "Login" in the navbar
2. Create a new account or login with existing credentials
3. You'll be redirected to the dashboard upon successful authentication

### 3. **Dashboard Features**
- **Overview**: See account statistics and quick actions
- **Posts**: Create, read, update, and delete posts
- **Profile**: View and manage user profile information
- **API Status**: Monitor backend health and available endpoints

### 4. **API Testing**
The dashboard includes a comprehensive interface for testing all backend endpoints:
- Authentication endpoints
- Posts CRUD operations
- Health check monitoring
- Real-time API status

## Environment Variables

### Backend (.env)
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=3001
NODE_ENV="development"

# CORS Configuration
CORS_ORIGIN="http://localhost:5173"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (client/.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Available Scripts

### Backend
- `npm run dev:server` - Start backend development server
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: Bcrypt password hashing
3. **Rate Limiting**: API rate limiting to prevent abuse
4. **CORS Protection**: Configured CORS for security
5. **Input Validation**: Zod schema validation
6. **Protected Routes**: Frontend route protection

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env
   - Run `npm run db:migrate`

2. **CORS Errors**
   - Verify CORS_ORIGIN in backend .env matches frontend URL
   - Check that both servers are running

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in backend .env
   - Verify API endpoints are accessible

4. **Frontend Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript compilation
   - Verify environment variables

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Posts Endpoints

#### POST /api/posts
```json
{
  "title": "My Post",
  "content": "Post content here",
  "published": true
}
```

All endpoints require authentication except `/api/auth/register`, `/api/auth/login`, and `/api/health`.

## Next Steps

1. **Add more features**: Comments, likes, user roles
2. **Enhance security**: Email verification, password reset
3. **Add file uploads**: User avatars, post images
4. **Implement real-time features**: WebSocket integration
5. **Add testing**: Unit and integration tests
6. **Deploy**: Set up production deployment 