import { useState } from "react";
import UserList from "./userlist"; // Kullanıcı listesi bileşeni
import CourseFormPage from "./courseForm"; // Kurs formu bileşeni
import CourseEditPage from "./courseEdit"; // Kurs düzenleme bileşeni
import '../App.css';


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users"); // varsayılan sekme
  const user = JSON.parse(localStorage.getItem("user"));
  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserList />;
      case "course":
        return <CourseFormPage />;
      case "formedit":
        return <CourseEditPage />
      default:
        return <div>Boş içerik</div>;
    }
  };
  const tabStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#007bff" : "#f0f0f0",
    color: activeTab === tab ? "#fff" : "#000",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: activeTab === tab ? "bold" : "normal",
  });
  

  return (
    <div style={{ padding: "20px" }}>
         <div>
      <h1>Admin Paneli</h1>
      <p>Hoş geldin, {user?.username}</p>
    </div>


      {/* Sekmeler */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("users")} style={tabStyle("users")}>
          Kullanıcı Listesi
        </button>
        <button onClick={() => setActiveTab("course")} style={tabStyle("course")}>
          Kurs Ekle
        </button>
        <button onClick={() => setActiveTab("formedit")} style={tabStyle("formedit")}>
          Form Edit
        </button>
      </div>

      {/* Sekmeye göre içerik */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px"  }}>
        {renderContent()}
      </div>
    </div>
  );
}
