import { Outlet, Link } from "react-router-dom"; // Outlet, alt bileşenlerin yerleştirileceği yerdir
import { NavLink } from "react-router-dom"; // NavLink, aktif linki vurgulamak için kullanılır
import ContactPage from "../pages/ContactPage";
import CourseCreate from "../pages/courseCreate";

export default function CourseLayout() {
  return (
    <>
      <div className="course-create">
        <Link to="/courses/create" className="create">
          Oluştur
        </Link>
      </div>

      <div id="courses-layout">
        {/* Diğer içerik olabilir */}
        <Outlet /> {/* Outlet, alt bileşenlerin yerleştirileceği yerdir */}
      </div>
    </>
  );
}
