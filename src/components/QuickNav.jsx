import React from 'react';
import { Heart, BookOpen, Users, Compass, Music, Flame } from 'lucide-react';

const menus = [
  { icon: <Heart size={24} />, label: 'Mind Log', desc: '오늘의 감정 기록', theme: 'from-rose-500 to-pink-600' },
  { icon: <BookOpen size={24} />, label: 'Scripture', desc: '오늘의 묵상', theme: 'from-blue-500 to-indigo-600' },
  { icon: <Users size={24} />, label: 'Lounge', desc: '공동체 소통', theme: 'from-emerald-500 to-teal-600' },
  { icon: <Flame size={24} />, label: 'Prayer', desc: '기도 요청', theme: 'from-amber-500 to-orange-600' },
];

export default function QuickNav({ onMoodClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {menus.map((item) => (
        <button 
          key={item.label}
          onClick={item.label === 'Mind Log' ? onMoodClick : undefined}
          className="group relative overflow-hidden p-6 bg-zinc-900/50 border border-white/5 rounded-3xl hover:bg-zinc-800/80 transition-all duration-300 text-left"
        >
          <div className="relative z-10 flex items-center gap-5">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.theme} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">{item.label}</h4>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          </div>
          {/* 은은한 배경 효과 */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${item.theme} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />
        </button>
      ))}
    </div>
  );
}
