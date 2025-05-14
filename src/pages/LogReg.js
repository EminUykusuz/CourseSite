import { useState } from "react";
import axios from "axios";

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

        // LocalStorage'a kullanıcı verilerini kaydedelim
        localStorage.setItem("user", JSON.stringify(res.data));

        alert(`${username} olarak giriş yaptınız.`);

        // Rol bilgisine göre yönlendirme yapalım
        if (role === "admin") {
          window.location.href = "/admin"; // Admin paneline yönlendir
        } else {
          window.location.href = "/home"; // Normal kullanıcıya yönlendir
        }
      } catch (err) {
        alert("Giriş hatası!");
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5002/register", { username, email, password });
        alert(res.data);
      } catch (err) {
        alert("Kayıt hatası");
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
}

