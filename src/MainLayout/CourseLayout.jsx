import { Outlet, Link } from "react-router-dom"; // Outlet, alt bileşenlerin yerleştirileceği yerdir
import { NavLink } from "react-router-dom"; // NavLink, aktif linki vurgulamak için kullanılır


export default function CourseLayout() {
  return (
    <>
      
      <div className="course-layout">
        <h2>Kurslar</h2>
      <Outlet />
       
      </div>
    </>
  );
}
