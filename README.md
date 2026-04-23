# Succulent Database

A full-stack web application to catalog and manage your succulent collection. Built with React, Express, and SQLite.

## Features

- ✅ **CRUD Operations** - Create, read, update, and delete succulents
- 🔍 **Search & Filter** - Find succulents by name, category, or tags
- 📸 **Photo Upload** - Attach photos to each succulent
- 🏷️ **Categories & Tags** - Organize your collection
- 💧 **Care Info** - Track watering frequency and sunlight requirements
- 📱 **Responsive Design** - Works great on desktop and mobile

## Project Structure

```
succulent-database/
├── backend/                    # Express server & API
│   ├── models/
│   │   └── database.js        # SQLite database setup
│   ├── routes/
│   │   └── succulents.js      # API endpoints
│   ├── uploads/               # Photo storage
│   ├── server.js              # Express app
│   ├── package.json
│   └── .gitignore
├── frontend/                   # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SucculentList.js
│   │   │   └── SucculentForm.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
└── succulents.db              # SQLite database (created on first run)
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Get All Succulents
```
GET /api/succulents
Query Parameters:
  - search: Search by name or description
  - category: Filter by category
  - tag: Filter by tag
```

### Get Single Succulent
```
GET /api/succulents/:id
```

### Create Succulent
```
POST /api/succulents
Content-Type: multipart/form-data

Fields:
  - name (required)
  - scientificName
  - description
  - category
  - tags (comma-separated)
  - wateringFrequency
  - sunlight
  - photo (file upload)
```

### Update Succulent
```
PUT /api/succulents/:id
Content-Type: multipart/form-data

Fields: Same as Create
```

### Delete Succulent
```
DELETE /api/succulents/:id
```

## Usage

1. **Add a Succulent**: Click the "Add Succulent" button and fill in the form
2. **View Details**: Browse your collection in the card grid view
3. **Search**: Use the search box to find succulents by name
4. **Filter**: Use category and tag dropdowns to filter your collection
5. **Edit**: Click the "Edit" button on any succulent card to modify details
6. **Delete**: Click "Delete" to remove a succulent from your collection
7. **Upload Photos**: Attach photos when creating or editing succulents

## Database Schema

### Succulents Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique identifier |
| name | TEXT | Succulent name |
| scientificName | TEXT | Scientific/Latin name |
| description | TEXT | Description |
| category | TEXT | Category (e.g., Aloe, Echeveria) |
| tags | TEXT | Comma-separated tags |
| photo | TEXT | Path to photo file |
| wateringFrequency | TEXT | Watering schedule |
| sunlight | TEXT | Sunlight requirements |
| createdAt | DATETIME | Creation timestamp |
| updatedAt | DATETIME | Last update timestamp |

## Technologies Used

### Frontend
- React 18
- Axios (HTTP client)
- CSS3 (Grid layout, animations)

### Backend
- Express.js
- SQLite3
- Multer (file uploads)
- CORS

## Development Notes

- The database is automatically created on first run
- Photos are stored in `/backend/uploads/`
- The React app proxies API requests to `http://localhost:5000`
- All timestamps are automatically managed by SQLite

## Next Steps

Consider adding:
- User authentication
- Themes (Dark mode)
- Notes/journal entries per succulent
- Watering reminders
- Export collection to PDF
- Mobile app with React Native
- Cloud backup

## License

MIT
