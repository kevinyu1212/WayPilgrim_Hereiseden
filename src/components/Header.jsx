import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="top-nav-bar">
      <div className="nav-left">
        <div className="logo-box">W</div>
        <span className="brand-name">WayPilgrim</span>
      </div>
      <div className="nav-right">
        {user ? (
          <span className="welcome-text">{user.email.split('@')[0]}님 환영합니다</span>
        ) : (
          <Link to="/login" className="login-link">로그인</Link>
        )}
        <button className="hamburger-menu">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
