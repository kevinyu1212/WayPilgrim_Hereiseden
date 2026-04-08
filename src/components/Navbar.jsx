import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleProfileClick = () => {
    closeMenu();
    if (user) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="main-header">
        <Link to="/" className="logo" onClick={closeMenu}>WayPilgrim</Link>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
      </header>

      <div className={`side-drawer ${isOpen ? "active" : ""}`}>
        {/* 최상단 프로필 섹션 */}
        <div className="drawer-profile-area" onClick={handleProfileClick}>
          <div className="profile-icon">👤</div>
          <div className="profile-text">
            {user ? (
              <>
                <strong className="user-name">{user.nickname}님</strong>
                <span className="sub-link">내 정보 보기 ></span>
              </>
            ) : (
              <>
                <strong className="login-prompt">로그인하세요</strong>
                <span className="sub-link">로그인 페이지로 이동 ></span>
              </>
            )}
          </div>
        </div>

        <nav className="drawer-menu">
          <Link to="/" onClick={closeMenu}>🏠 홈</Link>
          <Link to="/notice" onClick={closeMenu}>📢 공지사항</Link>
          {user && (
            <button className="logout-btn" onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}>로그아웃</button>
          )}
        </nav>
      </div>
      
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
