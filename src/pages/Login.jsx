import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`${data.user.nickname}님 환영합니다!`);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="auth-submit-btn">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
