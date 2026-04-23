const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../succulents.db');
const db = new sqlite3.Database(dbPath);

// Wrap database operations in promises
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const initializeDatabase = () => {
  db.serialize(() => {
    // Succulents table
    db.run(`
      CREATE TABLE IF NOT EXISTS succulents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        scientificName TEXT,
        description TEXT,
        category TEXT,
        tags TEXT,
        photo TEXT,
        wateringFrequency TEXT,
        sunlight TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized');
  });
};

module.exports = {
  db,
  run,
  get,
  all,
  initializeDatabase
};
