import {useRouteLoaderData} from "react-router-dom";
import CourseForm from "./courseForm";

export default function CourseEditPage() {
    const courses=useRouteLoaderData("course-details "); // useRouteLoaderData ile yüklenen veriyi alıyoruz
    return (
        <div id="course-edit">
            <h1>Kurs Düzenle</h1>
            <CourseForm data={courses} /> 
        </div>
    );
}