import { useState } from 'react';
import '../css/courseCreate.css'; // CSS dosyasını import ediyoruz
export default function CourseCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const userData = JSON.parse(localStorage.getItem("user"));
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("role", userData?.role || "user");

    try {
      const response = await fetch("http://localhost:5002/courses", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Kurs eklenemedi');
      
      setMessage({ type: 'success', text: '✅ Kurs başarıyla eklendi!' });
      setFormData({ title: '', description: '', image: null });
    } catch (err) {
      setMessage({ type: 'error', text: `❌ Hata: ${err.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="course-create">
      <h2 className="course-create__title">Yeni Kurs Ekle</h2>
      
      <form className="course-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="courseTitle" className="form-label">Kurs Başlığı</label>
          <input
            id="courseTitle"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Kurs adını yazın"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="courseDesc" className="form-label">Açıklama</label>
          <textarea
            id="courseDesc"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
            rows="5"
            placeholder="Kurs açıklamasını yazın"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="courseImage" className="form-label">Kurs Logosu</label>
          <input
            id="courseImage"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="form-file"
          />
          {formData.image && (
            <div className="file-preview">
              <p className="file-preview__name">{formData.image.name}</p>
              <p className="file-preview__size">
                {(formData.image.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="submit-btn__loader"></span>
          ) : (
            'Kursu Oluştur'
          )}
        </button>
      </form>
      
      {message.text && (
        <div className={`alert alert--${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}