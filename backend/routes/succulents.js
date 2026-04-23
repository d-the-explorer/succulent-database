const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { run, get, all } = require('../models/database');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all succulents with optional search/filter
router.get('/', async (req, res) => {
  try {
    const { search, category, tag } = req.query;
    let sql = 'SELECT * FROM succulents';
    const params = [];

    const conditions = [];
    if (search) {
      conditions.push('(name LIKE ? OR description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }
    if (tag) {
      conditions.push('tags LIKE ?');
      params.push(`%${tag}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY createdAt DESC';

    const succulents = await all(sql, params);
    res.json(succulents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single succulent
router.get('/:id', async (req, res) => {
  try {
    const succulent = await get('SELECT * FROM succulents WHERE id = ?', [req.params.id]);
    if (!succulent) {
      return res.status(404).json({ error: 'Succulent not found' });
    }
    res.json(succulent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create succulent
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, scientificName, description, category, tags, wateringFrequency, sunlight } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await run(
      `INSERT INTO succulents (name, scientificName, description, category, tags, photo, wateringFrequency, sunlight)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, scientificName, description, category, tags, photo, wateringFrequency, sunlight]
    );

    res.status(201).json({
      id: result.lastID,
      name,
      scientificName,
      description,
      category,
      tags,
      photo,
      wateringFrequency,
      sunlight
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update succulent
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const { name, scientificName, description, category, tags, wateringFrequency, sunlight } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : req.body.photo;

    await run(
      `UPDATE succulents 
       SET name = ?, scientificName = ?, description = ?, category = ?, tags = ?, photo = ?, wateringFrequency = ?, sunlight = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, scientificName, description, category, tags, photo, wateringFrequency, sunlight, req.params.id]
    );

    const updated = await get('SELECT * FROM succulents WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete succulent
router.delete('/:id', async (req, res) => {
  try {
    const succulent = await get('SELECT * FROM succulents WHERE id = ?', [req.params.id]);
    if (!succulent) {
      return res.status(404).json({ error: 'Succulent not found' });
    }

    // Delete photo file if exists
    if (succulent.photo) {
      const filePath = path.join(__dirname, '..', succulent.photo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await run('DELETE FROM succulents WHERE id = ?', [req.params.id]);
    res.json({ message: 'Succulent deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
