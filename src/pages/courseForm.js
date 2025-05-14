import { Form } from 'react-router-dom';
import '../App.css';  // CSS stil dosyasını ekleyin

export default function CourseFormPage({ data }) {
    return (
        <div className="course-form-container">
            <h2>{data ? 'Kursu Güncelle' : 'Yeni Kurs Ekle'}</h2>
            <Form method="post" encType="multipart/form-data">
                {/* Kurs Başlığı */}
                <div className="form-group">
                    <label htmlFor="title">Kurs Başlığı</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        defaultValue={data?.title || ""}
                    />
                </div>

                {/* Kapak Fotoğrafı */}
                <div className="form-group">
                    <label htmlFor="image">Kapak Fotoğrafı</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept=".jpg,.jpeg,.png"
                        required
                        defaultValue={data?.image || ""}
                    />
                </div>

                {/* Açıklama */}
                <div className="form-group">
                    <label htmlFor="description">Açıklama</label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        defaultValue={data?.description || ""}
                    ></textarea>
                </div>

                {/* Submit Butonu */}
                <button type="submit" className="submit-btn">
                    {data ? 'Kursu Güncelle' : 'Kursu Kaydet'}
                </button>
            </Form>
        </div>
    );
}
