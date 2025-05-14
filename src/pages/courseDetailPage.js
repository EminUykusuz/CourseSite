import { Form, useLoaderData } from "react-router-dom";
import avatar from "./images/avatar.png";

export default function CourseDetailPage() {
    const course = useLoaderData();

    return (
       <> <div className="course-detail-page">
            <h1>Course Details: {course.title}</h1>
            <br/><br/>
            <br />
            <img className="kapakfoto" src={`http://localhost:5000/images/${course.image}`} alt={course.title} />
            <h2>Açıklama</h2>
            <p>{course.description}</p>
        </div>


        <div className="user-comment">
  <h2>Kullanıcı Yorumları</h2>

  <div className="comment">
    <div className="images">
      <img src={avatar} alt="User" />
    </div>
    <div className="comment-content">
      <h3>Ümit Caner Erkoç</h3>
      <p>Bu kurs harika!</p>
    </div>
  </div>

  <div className="comment">
    <div className="images">
      <img src={avatar} alt="User" />
    </div>
    <div className="comment-content">
      <h3>Muhammed Mustafa Ulutaş</h3>
      <p>Gerçekten çok faydalıydı.</p>
    </div>
  </div>


</div>



      </>  
    );
}

export async function CourseDetailsLoader({ params }) {
    const { courseId } = params; // ✅ küçük harf değil, büyük harfli courseId
    console.log("Gelen courseId:", courseId);

    const res = await fetch(`http://localhost:5000/courses/${courseId}`);

    if (!res.ok) {
        throw new Error("Kurs bilgisi alınamadı.");
    }

    return res.json();
}
