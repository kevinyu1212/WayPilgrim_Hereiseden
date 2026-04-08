import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import QuickNav from '../components/QuickNav';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#0F1115] text-white">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0F1115]/95 backdrop-blur-xl border-b border-white/5 px-8">
        <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center font-black">W</div>
            <span className="text-xl font-serif font-bold">WayPilgrim</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={user}
        onLogout={() => { setUser(null); alert('로그아웃되었습니다.'); }}
        onLoginClick={() => navigate('/login')}
        onRegisterClick={() => navigate('/register')}
      />

      <main className="w-full flex justify-center pt-32 pb-20 px-8">
        <div className="w-full max-w-[1400px]">
          <HeroSection />
          <div className="mt-16 space-y-8">
             <h3 className="text-2xl font-bold italic border-l-4 border-amber-500 pl-4">Daily Journey</h3>
             <QuickNav onMoodClick={() => alert('감정 기록 기능 준비 중')} />
          </div>
        </div>
      </main>
    </div>
  );
}
