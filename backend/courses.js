const multer = require('multer');
const path = require('path');

// Dosyaları uploads klasörüne at
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Kurs ekleme (image upload)
app.post('/courses', upload.single('image'), (req, res) => {
  const { title, description, role } = req.body;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Yalnızca admin kurs ekleyebilir.' });
  }

  const imageUrl = `http://localhost:5002/uploads/${req.file.filename}`;
  const query = 'INSERT INTO Courses (Title, Description, ImageUrl) VALUES (?, ?, ?)';
  db.query(query, [title, description, imageUrl], (err, result) => {
    if (err) return res.status(500).json({ message: 'Kurs eklenemedi', error: err });
    res.status(201).json({ message: 'Kurs başarıyla eklendi!', id: result.insertId });
  });
});
