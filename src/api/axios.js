import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 백엔드 서버 주소
  headers: { "Content-Type": "application/json" }
});

// 요청 시 토큰 자동 삽입
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
