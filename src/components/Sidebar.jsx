import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isLoggedIn, user, handleLogout }) => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="profile-icon">👤</div>
        <h3>{isLoggedIn ? `${user.name}님 환영합니다` : "환영합니다"}</h3>
        <p>{isLoggedIn ? "순례를 이어가세요" : "로그인 후 순례를 시작하세요"}</p>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/">🏠 홈</Link>
        <Link to="/notice">📢 공지사항 및 설정</Link>
      </nav>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">로그아웃</button>
        ) : (
          <>
            <Link to="/login" className="login-link">로그인</Link>
            <Link to="/register" className="register-link">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
