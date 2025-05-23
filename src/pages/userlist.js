import { useEffect, useState } from "react";
import axios from "axios";
import "../css/userlist.css"; // En üstte import et
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
  <div className="userlist-wrapper">
    <div className="section-card">
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

    <div className="section-card">
      <h2>Tüm Kullanıcılar</h2>
      <table className="userlist-table">
        <thead>
          <tr>
            <th>Kullanıcı Adı</th>
            <th>E-posta</th>
            <th>Rol</th>
            <th>Rol Güncelle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
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
