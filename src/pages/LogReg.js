import { useState, useEffect } from "react";
import axios from "axios";
import "../css/logReg.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post("http://localhost:5002/login", { email, password });
        const { username, role } = res.data;
        localStorage.setItem("user", JSON.stringify(res.data));
        alert(`${username} olarak giriş yaptınız.`);
        window.location.href = role === "admin" ? "/admin" : "/home";
      } catch (err) {
        alert("Giriş hatası!");
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5002/register", {
          username,
          email,
          password,
        });
        alert(res.data);
        setIsLogin(true); // Kayıttan sonra login ekranına geç
      } catch (err) {
        alert("Kayıt hatası");
      }
    }
  };

  // Yıldızlar efekti
  useEffect(() => {
    const container = document.querySelector(".stars");
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.opacity = Math.random();
      container.appendChild(star);
    }
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="stars"></div>

      <div className="auth-box">
        <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
        </form>
        <p>
          {isLogin ? "Hesabınız yok mu?" : "Zaten bir hesabınız var mı?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Kayıt Ol" : " Giriş Yap"}
          </span>
        </p>
      </div>
    </div>
  );
}
