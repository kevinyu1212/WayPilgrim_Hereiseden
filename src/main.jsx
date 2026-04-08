import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// DB 및 로그인 정보 초기화 실행
localStorage.clear();
console.log('🚀 모든 로컬 데이터와 로그인 정보가 초기화되었습니다.');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
