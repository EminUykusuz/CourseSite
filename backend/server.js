const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789', // Veritabanı şifreni buraya yaz
  database: 'UsersTable', // Veritabanı adı
});

db.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('MySQL veritabanına bağlanıldı.');
  }
});

// Kullanıcı kaydı (Rol eklenerek)
app.post('/register', (req, res) => {
  const { username, email, password, role = 'user' } = req.body; // Varsayılan 'user' rolü
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  
  db.query(query, [username, email, password, role], (err, result) => {
    if (err) {
      console.error('Kayıt hatası:', err);
      return res.status(500).send('Kayıt sırasında hata oluştu.');
    }
    res.status(201).send('Kayıt başarılı!');
  });
});

// Kullanıcı girişi ve rol kontrolü
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Giriş hatası:', err);
      return res.status(500).send('Giriş sırasında hata oluştu.');
    }
    if (result.length === 0) {
      return res.status(401).send('Geçersiz kullanıcı bilgisi.');
    }

    // Kullanıcıyı ve rolü göndermemiz gerekiyor
    const { id, username, email: userEmail, role } = result[0];
    res.status(200).send({ id, username, email: userEmail, role });
  });
});

// Kullanıcıları listele
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Kullanıcıları çekerken hata:', err);
        return res.status(500).send('Sunucu hatası');
      }
      res.status(200).json(results);
    });
  });
  


// Kullanıcı rol sayılarını getir (istatistik için)
app.get('/user-stats', (req, res) => {
    db.query('SELECT role, COUNT(*) as count FROM users GROUP BY role', (err, results) => {
      if (err) {
        console.error('İstatistik hatası:', err);
        return res.status(500).send('Sunucu hatası');
      }
      res.status(200).json(results);
    });
  });
  
  app.put('/update-role', (req, res) => {
    const { id, role } = req.body;  // Kullanıcının ID'sini ve yeni rolünü alırız
    const query = 'UPDATE users SET role = ? WHERE id = ?';
  
    db.query(query, [role, id], (err, result) => {
      if (err) {
        console.error('Rol güncelleme hatası:', err);
        return res.status(500).send('Sunucu hatası');
      }
      res.status(200).send('Rol güncellendi');
    });
  });

// Sunucuyu başlat
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
