import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../api/authService";

const SetupProfile = () => {
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation(); // Register에서 전달받은 정보

  if (!state?.email) {
    navigate("/register");
    return null;
  }

  const handleFinish = async (skip = false) => {
    try {
      if (!skip && img) {
        await authService.updateProfile({ email: state.email, profileImage: img });
      }
      alert(`${state.nickname}님, 순례길에 오신 것을 환영합니다!`);
      navigate("/login");
    } catch (err) {
      alert("설정 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card profile-setup">
        <h2>프로필 설정</h2>
        <p>나를 잘 나타내는 사진을 등록해보세요.</p>
        <div className="circle-preview" onClick={() => document.getElementById('file-up').click()}>
          {img ? <img src={img} alt="profile" /> : "👤"}
        </div>
        <input type="file" id="file-up" hidden onChange={(e) => {
          const reader = new FileReader();
          reader.onload = () => setImg(reader.result);
          reader.readAsDataURL(e.target.files[0]);
        }} />
        <button onClick={() => handleFinish(false)} className="auth-submit-btn">저장하고 시작하기</button>
        <button onClick={() => handleFinish(true)} className="skip-btn">나중에 설정하기</button>
      </div>
    </div>
  );
};

export default SetupProfile;
