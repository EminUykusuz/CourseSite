const express = require('express');
const router = express.Router();
const db = require('../db'); // db bağlantı dosyan

// Tüm kursları çek
router.get('/courses', (req, res) => {
  db.query('SELECT * FROM Courses ORDER BY CreatedAt DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(results);
  });
});

// Yeni kurs ekle
router.post('/courses', (req, res) => {
  const { title, description, imageUrl } = req.body;
  db.query(
    'INSERT INTO Courses (Title, Description, ImageUrl) VALUES (?, ?, ?)',
    [title, description, imageUrl],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Insert error', error: err });
      }
      res.status(201).json({ message: 'Course added', id: result.insertId });
    }
  );
});

module.exports = router;
// // Kurs güncelle