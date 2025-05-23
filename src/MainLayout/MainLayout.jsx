import { useEffect, useState, useRef } from 'react';
import Sidebar from './Sidebar';
import { NavLink, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import '../css/mainLayout.css'; // CSS dosyasını ekledik

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="main-layout">
      <div className="navbar">
        <div className="nav-left">MainLayout</div>

        <div className="nav-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active-link" : "nav-item"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "nav-item active-link" : "nav-item"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-item active-link" : "nav-item"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/todolist"
            className={({ isActive }) =>
              isActive ? "nav-item active-link" : "nav-item"
            }
          >
           To Do List
          </NavLink>
          <NavLink
            to="/helpLayout"
            className={({ isActive }) =>
              isActive ? "nav-item active-link" : "nav-item"
            }
          >
           Help
          </NavLink>
        </div>

        <div className="nav-right">
          {user ? (
            <div
              ref={dropdownRef}
              className="user-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              👤 {user.username}
              {dropdownOpen && (
                <div className="dropdown-content">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profil
                  </button>
                  {user?.role === "admin" && (
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/admin");
                      }}
                    >
                      Admin Paneli
                    </button>
                  )}
                  <button onClick={handleLogout}>Çıkış Yap</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="join-btn"
                onClick={() => navigate("/register")}
              >
                Join
              </button>
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;