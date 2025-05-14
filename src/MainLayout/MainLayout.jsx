import { useEffect, useState, useRef } from 'react';
import Sidebar from './Sidebar';
import { NavLink, Outlet, useNavigate, useNavigation } from 'react-router-dom';

export default function MainLayout() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);  // Dropdown referansını oluşturduk

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/"); // Ana sayfaya yönlendiriyoruz
  };

  // Dışarı tıklayınca dropdown kapanır
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="main-layout">
      <header className="container1">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>MainLayout</h1>

          {user && (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: "pointer", padding: "8px", borderRadius: "5px", backgroundColor: "#f0f0f0" }}
              >
                👤 {user.username}
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                    minWidth: "150px"
                  }}
                >
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile"); // Profil sayfasına yönlendir
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer"
                    }}
                  >
                    Profil
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "red"
                    }}
                  >
                    Çıkış Yap
                  </button>

                  {/* Admin linkini sadece admin için gösteriyoruz */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/admin"); // Admin sayfasına yönlendir
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer"
                      }}
                    >
                      Admin Paneli
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/HelpLayout">Help</NavLink>
          <NavLink to="/todolist">Yapılacaklar</NavLink>
          {!user && <NavLink to="/AuthPage">User</NavLink>}
          {/* Admin Linkini burada göstermiyoruz, dropdown içinde olacak */}
        </nav>
      </header>

      <main className="container">
        <Sidebar />
        {navigation.state === "loading" && (
          <h1 style={{ fontSize: "Larger" }}>Loading...</h1>
        )}
        <Outlet />
        <footer>
          <p style={{ textAlign: "center" }}>
            copyright &copy; 2023 <br />
          </p>
        </footer>
      </main>
    </div>
  );
}
