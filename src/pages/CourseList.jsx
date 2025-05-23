import { useEffect, useState } from "react";
import { Link, useRouteError } from "react-router-dom";
import styles from '../css/courses.module.css';


export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5002/courses");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu kursu silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`http://localhost:5002/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Silme işlemi başarısız");
        }

        setCourses((prev) => prev.filter((course) => course.Id !== id));
      } catch (error) {
        console.error("Kurs silinirken hata oluştu:", error.message);
        alert("Kurs silinemedi: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className={styles["cl-loading"]}>
        <div className={styles["cl-loading__spinner"]}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["cl-error"]}>
        <h3 className={styles["cl-error__title"]}>Hata Oluştu</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles["cl-container"]}>
      {user?.role === "admin" && (
        <div className={styles["cl-admin-message"]}>
          (Admin olarak kursları görebiliyorsun)
        </div>
      )}

      <ul className={styles["cl-grid"]}>
        {courses.map((course) => (
          <li key={course.Id} className={styles["cl-card"]}>
            <img
              src={course.ImageUrl || course.Image}
              alt="Kurs görseli"
              className={styles["cl-card__image"]}
            />
            <div className={styles["cl-card__content"]}>
              <Link
                to={`/courses/${course.Id}`}
                className={styles["cl-card__title-link"]}
              >
                <h3 className={styles["cl-card__title"]}>{course.Title}</h3>
              </Link>
              <p className={styles["cl-card__description"]}>
                {course.Description}
              </p>
              <div className={styles["cl-card__meta"]}>
                {course.Price && (
                  <span className={styles["cl-card__meta-item"]}>
                    Fiyat: {course.Price}
                  </span>
                )}
                {course.Rating && (
                  <span className={styles["cl-card__meta-item"]}>
                    Puan: {course.Rating}
                  </span>
                )}
                {course.Duration && (
                  <span className={styles["cl-card__meta-item"]}>
                    Süre: {course.Duration} saat
                  </span>
                )}
              </div>

              {user?.role === "admin" && (
                <div className={styles["cl-card__actions"]}>
                  <button
                    onClick={() => handleDelete(course.Id)}
                    className={`${styles["cl-card__button"]} ${styles["cl-card__button--delete"]}`}
                  >
                    Sil
                  </button>
                  <Link
                    to={`/admin/courses/edit/${course.Id}`}
                    className={`${styles["cl-card__button"]} ${styles["cl-card__button--edit"]}`}
                  >
                    Düzenle
                  </Link>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className={styles["cl-error"]}>
      <h2 className={styles["cl-error__title"]}>Kurs Listesi Yüklenemedi!</h2>
      <p>{error.statusText || error.message}</p>
      <p>Status: {error.status}</p>
      <a href="/">Ana sayfaya dön</a>
    </div>
  );
}