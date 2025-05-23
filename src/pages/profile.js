import React from 'react';
import '../css/profile.css';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: "İsimsiz Kullanıcı",
    email: "kullanici@example.com",
    role: "user",
    avatar: "" // örnek görsel
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatar} alt="Profil Resmi" className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <span className={`profile-role ${user.role}`}>{user.role.toUpperCase()}</span>

        <div className="profile-actions">
          <button className="btn edit">Profili Düzenle</button>
          <button className="btn logout">Çıkış Yap</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
