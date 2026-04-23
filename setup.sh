#!/bin/bash
# Quick start script to set up and run the succulent database

echo "🌵 Setting up Succulent Database..."
echo ""

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo ""

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo ""

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "The app will open at http://localhost:3000"
