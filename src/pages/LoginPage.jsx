
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basit şekilde role bazlı giriş
    localStorage.setItem("user", JSON.stringify({ username, role }));
    navigate("/admin");
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı adı"
        onChange={(e) => setUsername(e.target.value)}
      />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">Kullanıcı</option>
      </select>
      <button onClick={handleLogin}>Giriş</button>
    </div>
  );
};

export default LoginPage;



