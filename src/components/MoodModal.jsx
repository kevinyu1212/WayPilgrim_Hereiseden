import React, { useState } from 'react';
import { X, Smile, Frown, Meh, Heart, CloudRain } from 'lucide-react';
import axios from 'axios';

export default function MoodModal({ isOpen, onClose, userEmail }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const moods = [
    { icon: <Smile size={32} />, label: '기쁨', color: 'text-yellow-500' },
    { icon: <Meh size={32} />, label: '평온', color: 'text-blue-400' },
    { icon: <Heart size={32} />, label: '감사', color: 'text-rose-500' },
    { icon: <CloudRain size={32} />, label: '우울', color: 'text-slate-500' },
    { icon: <Frown size={32} />, label: '힘듦', color: 'text-stone-600' },
  ];

  const handleSubmit = async () => {
    if (!selectedMood) return alert('오늘의 기분을 선택해주세요.');
    try {
      await axios.post('http://localhost:5000/api/mood/save', {
        email: userEmail || 'test@test.com',
        mood: selectedMood,
        note: note
      });
      alert('오늘의 마음이 저장되었습니다.');
      onClose();
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6 text-center">오늘의 마음은 어떤가요?</h2>
        
        <div className="flex justify-between mb-8">
          {moods.map((m) => (
            <button 
              key={m.label}
              onClick={() => setSelectedMood(m.label)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${selectedMood === m.label ? 'bg-amber-50 ring-2 ring-amber-200' : 'hover:bg-stone-50'}`}
            >
              <div className={m.color}>{m.icon}</div>
              <span className="text-xs font-medium text-stone-500">{m.label}</span>
            </button>
          ))}
        </div>

        <textarea 
          placeholder="나누고 싶은 짧은 묵상이나 일기를 적어보세요."
          className="w-full h-32 p-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-200 resize-none text-stone-700 mb-6"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-500 transition-colors"
        >
          기록하기
        </button>
      </div>
    </div>
  );
}
