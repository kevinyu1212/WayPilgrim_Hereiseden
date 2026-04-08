import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);

  // 앱 시작 시 로컬스토리지에서 유저 정보 불러오기
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Auth setUser={setUser} />} 
        />
        {/* 필요한 다른 라우트들 */}
      </Routes>
    </Router>
  );
}

export default App;
