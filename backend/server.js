const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'AppDB',
});

db.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('MySQL veritabanına bağlanıldı.');
  }
});

// Multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


// ✅ Kullanıcı Kaydı
app.post('/register', (req, res) => {
  const { username, email, password, role = 'user' } = req.body;
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';

  db.query(query, [username, email, password, role], (err) => {
    if (err) {
      console.error('Kayıt hatası:', err);
      return res.status(500).send('Kayıt sırasında hata oluştu.');
    }
    res.status(201).send('Kayıt başarılı!');
  });
});


// ✅ Kullanıcı Girişi
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).send('Giriş hatası');
    if (result.length === 0) return res.status(401).send('Geçersiz kullanıcı bilgisi');

    const { id, username, email: userEmail, role } = result[0];
    res.status(200).send({ id, username, email: userEmail, role });
  });
});


// ✅ Kullanıcıları Listele
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send('Sunucu hatası');
    res.status(200).json(results);
  });
});


// ✅ Kullanıcı Rol İstatistikleri
app.get('/user-stats', (req, res) => {
  db.query('SELECT role, COUNT(*) as count FROM users GROUP BY role', (err, results) => {
    if (err) return res.status(500).send('Sunucu hatası');
    res.status(200).json(results);
  });
});


// ✅ Rol Güncelleme
app.put('/update-role', (req, res) => {
  const { id, role } = req.body;
  const query = 'UPDATE users SET role = ? WHERE id = ?';

  db.query(query, [role, id], (err) => {
    if (err) return res.status(500).send('Sunucu hatası');
    res.status(200).send('Rol güncellendi');
  });
});


// ✅ Kurs Listeleme
app.get('/courses', (req, res) => {
  db.query('SELECT * FROM Courses ORDER BY CreatedAt DESC', (err, results) => {
    if (err) return res.status(500).send('Kursları çekerken hata');
    res.status(200).json(results);
  });
});


// ✅ Kurs Silme
app.delete('/api/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const query = 'DELETE FROM Courses WHERE id = ?';

  db.query(query, [courseId], (err, result) => {
    if (err) {
      console.error('Kurs silme hatası:', err);
      return res.status(500).json({ message: 'Kurs silinemedi' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kurs bulunamadı' });
    }

    res.status(200).json({ message: 'Kurs başarıyla silindi' });
  });
});


// ✅ Kurs Ekleme (Görsel Yüklemeli)
app.post('/courses', upload.single('image'), (req, res) => {
  const { title, description, role } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Yalnızca admin kurs ekleyebilir.' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Görsel dosyası yüklenmedi.' });
  }

  const imageUrl = `http://localhost:5002/uploads/${req.file.filename}`;
  const query = 'INSERT INTO Courses (Title, Description, ImageUrl) VALUES (?, ?, ?)';

  db.query(query, [title, description, imageUrl], (err, result) => {
    if (err) return res.status(500).json({ message: 'Kurs eklenemedi', error: err });
    res.status(201).json({ message: 'Kurs eklendi', id: result.insertId });
  });
});


// ✅ Sunucuyu Başlat
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
