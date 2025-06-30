#!/bin/bash

echo "🚀 Setting up Backend for Stellar World..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please edit it with your database credentials."
else
    echo "✅ .env file already exists."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

echo ""
echo "🎉 Backend setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your database credentials"
echo "2. Set up your PostgreSQL database"
echo "3. Run: npm run db:migrate"
echo "4. Start the server: npm run dev:server"
echo ""
echo "📚 For detailed documentation, see BACKEND_README.md" 