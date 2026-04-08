import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", userId: "", nickname: "" });
  const [checks, setChecks] = useState({ email: false, userId: false, nickname: false });
  const navigate = useNavigate();

  const checkDuplicate = async (type, value) => {
    if (!value) return alert("값을 입력해주세요.");
    try {
      const res = await authService.checkDuplicate(type, value);
      
      // 서버 응답이 res.available, res.isAvailable, 혹은 res 자체가 boolean인 경우 모두 체크
      const isAvailable = res.available === true || res.isAvailable === true || res === true;

      if (isAvailable) {
        setChecks(prev => ({ ...prev, [type]: true }));
        alert("사용 가능한 정보입니다.");
      } else {
        setChecks(prev => ({ ...prev, [type]: false }));
        alert("이미 사용 중인 정보입니다.");
      }
    } catch (err) {
      console.error("중복 확인 에러:", err);
      // 서버에서 409 Conflict 등으로 에러를 던지는 경우에도 '이미 존재'로 처리
      setChecks(prev => ({ ...prev, [type]: false }));
      alert(err.response?.data?.message || "이미 존재하거나 사용할 수 없는 값입니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      if (!checks.email || !checks.userId || !checks.nickname) {
        return alert("이메일, 아이디, 닉네임 모두 중복 확인을 해주세요.");
      }
      if (form.password !== form.confirmPassword) {
        return alert("비밀번호가 일치하지 않습니다.");
      }
    }

    try {
      if (isLogin) {
        const data = await authService.login(form.email, form.password);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      } else {
        await authService.register(form);
        alert("가입 성공! 로그인해주세요.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "요청 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "로그인" : "회원가입"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="email" placeholder="이메일" onChange={(e)=>{setForm({...form, email: e.target.value}); setChecks({...checks, email: false})}} required />
            {!isLogin && <button type="button" onClick={()=>checkDuplicate("email", form.email)} className={checks.email ? "checked" : ""}>중복확인</button>}
          </div>
          {!isLogin && (
            <>
              <div className="input-group">
                <input type="text" placeholder="아이디" onChange={(e)=>{setForm({...form, userId: e.target.value}); setChecks({...checks, userId: false})}} required />
                <button type="button" onClick={()=>checkDuplicate("userId", form.userId)} className={checks.userId ? "checked" : ""}>중복확인</button>
              </div>
              <div className="input-group">
                <input type="text" placeholder="닉네임" onChange={(e)=>{setForm({...form, nickname: e.target.value}); setChecks({...checks, nickname: false})}} required />
                <button type="button" onClick={()=>checkDuplicate("nickname", form.nickname)} className={checks.nickname ? "checked" : ""}>중복확인</button>
              </div>
            </>
          )}
          <input type="password" placeholder="비밀번호" onChange={(e)=>setForm({...form, password: e.target.value})} required />
          {!isLogin && <input type="password" placeholder="비밀번호 확인" onChange={(e)=>setForm({...form, confirmPassword: e.target.value})} required />}
          <button type="submit" className="main-submit-btn">{isLogin ? "로그인" : "가입하기"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{textAlign: 'center', cursor: 'pointer', color: '#888', marginTop: '15px'}}>
          {isLogin ? "계정이 없으신가요? 회원가입" : "이미 계정이 있나요? 로그인"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
