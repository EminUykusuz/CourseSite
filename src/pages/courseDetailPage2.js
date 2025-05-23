import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import avatar from "./images/avatar.png";
import RatingComponent from "../Components/RatingComponent";
import axios from "axios";

export default function CourseDetailPagee({ userId }) {
  const { courseId } = useParams(); // useParams ile courseId'yi alın
  const [course, setCourse] = useState(null); // state tanımlayın

  useEffect(() => {
    axios.get(`http://localhost:5002/api/courses/${courseId}`)
      .then(res => {
        console.log('Course data:', res.data);
        setCourse(res.data);
      })
      .catch(err => {
        console.error('Error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
      });
  }, [courseId]);

  if (!course) return <p>Yükleniyor...</p>; // course henüz yüklenmediyse

  return (
    <>
      <div className="course-detail-page">
        <h1>Course Details: {course.title}</h1>
        <br /><br />
        <img className="kapakfoto" src={`http://localhost:5002/images/${course.image}`} alt={course.title} />
        <h2>Açıklama</h2>
        <p>{course.description}</p>
      </div>

      <div className="rating">
        <h2>Puan Ver</h2>
        <RatingComponent userId={userId} courseId={course.id} />
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
  const response = await fetch(`http://localhost:5002/api/courses/${params.courseId}`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const course = await response.json();
  return course;
}