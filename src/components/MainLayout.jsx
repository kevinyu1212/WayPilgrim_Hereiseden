import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function MainLayout({ children, user }) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* 사이드바 공간 (필요 시 확장) */}
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-stone-400 text-sm font-medium">WayPilgrim 에 오신 것을 환영합니다</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-500 hover:bg-stone-100 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-stone-200">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="text-sm font-semibold text-stone-700">{user?.name || '순례자'} 님</span>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
