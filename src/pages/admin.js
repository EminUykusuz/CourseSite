import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  FiUsers, 
  FiBook, 
  FiPlusSquare, 
  FiEdit, 
  FiLogOut,
  FiHome,
  FiPieChart,
  FiMessageSquare
} from 'react-icons/fi';
import UserList from './userlist';
import CourseList from './CourseList';
import CourseCreate from './CourseCreate';
import '../css/AdminPanel.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'users':
        return <UserList />;
      case 'courses':
        return <CourseList />;
      case 'coursecreate':
        return <CourseCreate />;
      case 'messages':
        return <Messages />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FiPieChart size={28} />
            <h2>Admin Paneli</h2>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="username">{user.username}</p>
              <p className="user-role">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome className="nav-icon" />
            <span>Dashboard</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers className="nav-icon" />
            <span>Kullanıcılar</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <FiBook className="nav-icon" />
            <span>Kurslar</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'coursecreate' ? 'active' : ''}`}
            onClick={() => setActiveTab('coursecreate')}
          >
            <FiPlusSquare className="nav-icon" />
            <span>Kurs Ekle</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare className="nav-icon" />
            <span>Mesajlar</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="nav-icon" />
          <span>Çıkış Yap</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="content-header">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'users' && 'Kullanıcı Yönetimi'}
            {activeTab === 'courses' && 'Kurs Yönetimi'}
            {activeTab === 'coursecreate' && 'Yeni Kurs Oluştur'}
            {activeTab === 'messages' && 'Mesajlar'}
          </h1>
        </div>
        
        <div className="content-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Örnek bileşenler
function DashboardStats() {
  return (
    <div className="dashboard-grid">
      <div className="stats-card">
        <div className="card-icon" style={{ background: '#EBF5FF' }}>
          <FiUsers size={24} color="#3182CE" />
        </div>
        <div>
          <h3>Toplam Kullanıcı</h3>
          <p>1,234</p>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="card-icon" style={{ background: '#EBFAF1' }}>
          <FiBook size={24} color="#38A169" />
        </div>
        <div>
          <h3>Toplam Kurs</h3>
          <p>56</p>
        </div>
      </div>
    </div>
  );
}

function Messages() {
  return (
    <div className="messages-container">
      <h3>Mesajlar Sayfası</h3>
      <p>Burada kullanıcı mesajları listelenecek</p>
    </div>
  );
}