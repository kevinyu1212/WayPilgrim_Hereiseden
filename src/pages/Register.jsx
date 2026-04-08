import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../api/authService";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", userId: "", nickname: "", password: "", confirmPassword: "" });
  const [validation, setValidation] = useState({ email: null, userId: null, nickname: null });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (["email", "userId", "nickname"].includes(name) && value !== "") {
      try {
        const isAvailable = await authService.checkDuplicate(name, value);
        setValidation(prev => ({ ...prev, [name]: isAvailable }));
      } catch (err) { console.error("체크 실패"); }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validation.email || !validation.userId || !validation.nickname) return setError("중복 확인을 먼저 해주세요.");
    if (formData.password !== formData.confirmPassword) return setError("비밀번호가 일치하지 않습니다.");

    try {
      // 서버에 계정 생성 요청
      await authService.register(formData);
      // 가입 성공 시, 프로필 설정을 위해 이메일만 들고 이동
      navigate("/setup-profile", { state: { email: formData.email, nickname: formData.nickname } });
    } catch (err) {
      setError(err.response?.data?.message || "가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>순례자 가입</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <div className="input-box">
              <input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
              <span className={`status ${validation.email ? "ok" : "no"}`}>{validation.email === true ? "✔" : "✘"}</span>
            </div>
            <div className="input-box">
              <input type="text" name="userId" placeholder="사용자 ID" onChange={handleChange} required />
              <span className={`status ${validation.userId ? "ok" : "no"}`}>{validation.userId === true ? "✔" : "✘"}</span>
            </div>
            <div className="input-box">
              <input type="text" name="nickname" placeholder="닉네임" onChange={handleChange} required />
              <span className={`status ${validation.nickname ? "ok" : "no"}`}>{validation.nickname === true ? "✔" : "✘"}</span>
            </div>
            <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} required />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="auth-submit-btn">가입 및 프로필 설정</button>
        </form>
        <div className="auth-footer">이미 계정이 있나요? <Link to="/login">로그인</Link></div>
      </div>
    </div>
  );
};

export default Register;
