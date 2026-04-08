import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AuthPanel() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null); // 로그인된 사용자 상태
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // 1. 앱 시작 시 로컬 스토리지 확인
  useEffect(() => {
    const savedUser = localStorage.getItem('wayUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      if (isLogin) {
        const userData = res.data.user;
        setUser(userData);
        localStorage.setItem('wayUser', JSON.stringify(userData)); // 로컬에 저장
        setMessage(`${userData.name}님, 환영합니다!`);
      } else {
        setMessage('회원가입 성공! 이제 로그인하세요.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || '오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wayUser');
    setUser(null);
    setMessage('로그아웃 되었습니다.');
  };

  if (user) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-amber-700 font-bold">{user.name[0]}</span>
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">{user.name}님</h2>
        <p className="text-stone-500 mb-6">{user.email}</p>
        <button 
          onClick={handleLogout}
          className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold rounded-xl transition-all"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">{isLogin ? '로그인' : '회원가입'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input type="text" placeholder="이름" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl outline-none"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        )}
        <input type="email" placeholder="이메일" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl outline-none"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="비밀번호" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl outline-none"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button className="w-full py-4 bg-amber-700 text-white font-bold rounded-xl shadow-lg">
          {isLogin ? '로그인' : '가입하기'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-amber-600">{message}</p>}
      <div className="mt-6 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-stone-500 underline">
          {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있나요? 로그인'}
        </button>
      </div>
    </div>
  );
}
