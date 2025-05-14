import { useEffect, useState } from "react";
import axios from "axios";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";



const COLORS = {
  admin: "#ff4d4d", // kırmızı
  user: "#4d79ff",  // mavi
};
const thStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f5f5f5"
  };
  
  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px"
  };
  

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Kullanıcıları ve istatistikleri çek
  useEffect(() => {
    axios.get("http://localhost:5002/users").then(res => {
      setUsers(res.data);
    });

    axios.get("http://localhost:5002/user-stats").then(res => {
      setStats(res.data);
    });
  }, []);

  // Kullanıcı rolünü değiştirme
  const handleRoleChange = (userId, newRole) => {
    setLoading(true);  // İşlem yapılıyor durumu
    axios
      .put("http://localhost:5002/update-role", { id: userId, role: newRole })
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        setLoading(false);
        alert("Rol başarıyla güncellendi!");
      })
      .catch((err) => {
        setLoading(false);
        alert("Rol güncellenirken bir hata oluştu.");
      });
  };



  return (

    
 
    <div style={{ width:"950px"  }}>
    {/* Sol Kolon: Grafik */}
    <div >
      <h2>Kullanıcı Rolleri - Pasta Grafiği</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={stats}
          dataKey="count"
          nameKey="role"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {stats.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.role] || "#ccc"}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  
    {/* Sağ Kolon: Kullanıcı Listesi */}
    <div >
      <h2>Tüm Kullanıcılar</h2>
      <table style={{ width: "100%", marginLeft:"-15px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Kullanıcı Adı</th>
            <th style={thStyle}>E-posta</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Rol Güncelle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  disabled={loading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    
  );
}
