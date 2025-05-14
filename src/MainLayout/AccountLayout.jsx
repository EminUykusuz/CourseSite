import { Outlet, Link } from "react-router-dom"; // Outlet, alt bileşenlerin yerleştirileceği yerdir

export default function CourseLayout() {
  return (
    <>
  
          {/* Diğer içerik olabilir */}
        <Outlet /> {/* Outlet, alt bileşenlerin yerleştirileceği yerdir */}
      
     

    
      
    </>
  );
}