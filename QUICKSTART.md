# Quick start guides

## Option 1: Using the setup script (Linux/Mac)

```bash
chmod +x setup.sh
./setup.sh
```

Then follow the instructions at the end.

## Option 2: Manual setup

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

The app opens at http://localhost:3000

## Troubleshooting

**Port 5000 already in use:**
```bash
# Kill the process
lsof -ti:5000 | xargs kill -9
```

**Port 3000 already in use:**
```bash
# React will ask to run on a different port
# Just press 'Y' when prompted
```

**Dependencies won't install:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Database issues:**
```bash
# Delete the database to reset
rm succulents.db
# It will be recreated on next server start
```
