import React from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("로그인이 필요한 서비스입니다.");
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <div className="mypage-container">
      <div className="profile-card">
        <div className="profile-img">
          {user.profileImage ? <img src={user.profileImage} alt="profile" /> : "👤"}
        </div>
        <h2>{user.nickname} <span>(@{user.userId})</span></h2>
        <p className="user-email">{user.email}</p>
        
        <div className="user-stats">
          <div className="stat-item"><strong>순례 등급</strong><p>초보 순례자</p></div>
          <div className="stat-item"><strong>가입일</strong><p>2026.04.08</p></div>
        </div>

        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
      </div>
    </div>
  );
};

export default MyPage;
