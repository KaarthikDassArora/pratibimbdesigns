#!/bin/bash

echo "🚀 Setting up Frontend-Backend Integration..."

# Create frontend environment file
echo "📝 Creating frontend environment file..."
cat > client/.env << EOF
VITE_API_URL=http://localhost:3001/api
VITE_NODE_ENV=development
EOF

echo "✅ Frontend environment file created at client/.env"

# Check if backend .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "📝 Please create a .env file in the root directory with the following content:"
    echo ""
    echo "DATABASE_URL=\"postgresql://username:password@localhost:5432/your_database_name\""
    echo "JWT_SECRET=\"your-super-secret-jwt-key-change-this-in-production\""
    echo "JWT_EXPIRES_IN=\"7d\""
    echo "PORT=3001"
    echo "NODE_ENV=\"development\""
    echo "CORS_ORIGIN=\"http://localhost:5173\""
    echo "RATE_LIMIT_WINDOW_MS=900000"
    echo "RATE_LIMIT_MAX_REQUESTS=100"
    echo ""
    echo "💡 You can copy from env.example: cp env.example .env"
else
    echo "✅ Backend .env file found"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your database connection in .env"
echo "2. Run: npm run db:generate"
echo "3. Run: npm run db:migrate"
echo "4. Start backend: npm run dev:server"
echo "5. Start frontend: npm run dev"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo "   Login:    http://localhost:5173/login"
echo "   Dashboard: http://localhost:5173/dashboard (after login)" 