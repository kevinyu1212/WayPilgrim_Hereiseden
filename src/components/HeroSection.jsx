import React from 'react';

// 서비스와 어울리는 영감을 주는 이미지 URL (Unsplash)
// 1. 새벽녘 산길: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80
// 2. 고요한 호수: https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=1600&q=80
// 3. 별이 빛나는 밤: https://images.unsplash.com/photo-1506318136945-3e4141662986?w=1600&q=80

const BG_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] min-h-[500px] shadow-2xl shadow-zinc-950/50 group">
      {/* Background Image with Ken Burns Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-[10000ms] ease-out"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      
      {/* 딥 다크 그라데이션 오버레이 (가독성 및 분위기) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-12 lg:p-20 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-200 text-xs font-bold tracking-[0.2em] uppercase">Today's Manna</span>
          </div>
          
          <h2 className="text-white font-serif text-5xl lg:text-6xl leading-[1.15] tracking-tight drop-shadow-2xl">
            여호와는 나의 목자시니<br />
            내게 부족함이 없으리로다
          </h2>
          
          <p className="text-zinc-300 text-xl font-light tracking-wide pt-2">
            — 시편 23:1
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button className="px-8 py-4 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-600/20 active:scale-95">
            오늘의 묵상 시작하기
          </button>
          <button className="px-8 py-4 bg-white/5 text-white font-medium rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10">
            말씀 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
