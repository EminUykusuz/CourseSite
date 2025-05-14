  import {  Link, useRouteLoaderData } from "react-router-dom";



  export default function Courses() {
    const courses = useRouteLoaderData("courses-loader"); // useLoaderData ile yüklenen veriyi alıyoruz

    // Eğer courses undefined veya null ise boş bir dizi döndürülür
    const courseList = courses || [];

    return (
      <>
        <h1 className="coursesler">Courses</h1>
        <div id="courses">
          {courseList.length === 0 ? (
            <p>No courses available.</p> // Eğer kurs yoksa mesaj ver
          ) : (
            courseList.map((item, index) => (
              <div key={item.id} className="card">
                <Link id="imagelink" to={`/courses/${index + 1}`}>
                  <img src={`http://localhost:5000/images/${item.image}`} alt={item.title} />
                </Link>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <Link to={`/courses/${index + 1}`}>Detaylara Git</Link>
                  <Link to={`/courses/${item.id}/edit`}>Edit</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  }
  export async function CoursesLoader() {
    const res = await fetch("http://localhost:5000/courses"); // API'den veri çekiyoruz
    return res.json(); // JSON formatında döndürüyoruz
  }