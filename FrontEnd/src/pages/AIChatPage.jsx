import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { GiChefToque, GiCookingPot, GiWoodenSpoon, GiChiliPepper } from 'react-icons/gi';
import { useTheme } from '../context/ThemeContext';
import ChatWindow from '../components/ai/ChatWindow';

const ICONS = [
  { key: 'chef', Icon: GiChefToque, fromX: -160, fromY: -60, rot: -16, delay: 0, pos: { left: '3%', top: '8%' } },
  { key: 'pot', Icon: GiCookingPot, fromX: 170, fromY: -50, rot: 14, delay: 150, pos: { right: '3%', top: '12%' } },
  { key: 'spoon', Icon: GiWoodenSpoon, fromX: -170, fromY: 60, rot: 12, delay: 300, pos: { left: '2%', bottom: '10%' } },
  { key: 'pepper', Icon: GiChiliPepper, fromX: 175, fromY: 55, rot: -18, delay: 450, pos: { right: '4%', bottom: '6%' } },
];

export default function AIChatPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPlayed(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-brown-900' : 'bg-cream-100'}`}>
      {/* Back button */}
      <div className="container-editorial pt-8 pb-2">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            isDark ? 'text-cream-200 hover:text-orange-400' : 'text-brown-700 hover:text-orange-500'
          }`}
        >
          <FiArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Heading */}
      <div className="container-editorial pb-6 text-center">
        <p className={`text-xs font-semibold tracking-wide uppercase mb-2 ${isDark ? 'text-orange-400' : 'text-orange-500'}`}>
          Recipe AI Assistant
        </p>
        <h1 className={`font-serif italic text-3xl md:text-4xl font-bold ${isDark ? 'text-cream-100' : 'text-brown-800'}`}>
          Poocho, kya banau aaj?
        </h1>
      </div>

      {/* Stage: icons + chat */}
      <div className="container-editorial pb-16">
        <div className="relative max-w-2xl mx-auto" style={{ minHeight: '520px' }}>

          {ICONS.map(({ key, Icon, fromX, fromY, rot, delay, pos }) => (
            <div
              key={key}
              className="absolute w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                ...pos,
                background: isDark ? '#4a3526' : '#f0dcc4',
                opacity: played ? 1 : 0,
                transform: played
                  ? `translate(0, 0) rotate(${rot}deg) scale(1)`
                  : `translate(${fromX}px, ${fromY}px) rotate(${rot * 2}deg) scale(0.4)`,
                transition: `transform 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
              }}
            >
              <Icon size={26} className={isDark ? 'text-orange-300' : 'text-orange-600'} />
            </div>
          ))}

          {/* Chat container */}
          <div
            className={`relative z-10 mx-auto w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-brown-800 border-dark-border' : 'bg-white border-cream-300'
            }`}
            style={{ height: '520px' }}
          >
            <div
              className={`flex items-center gap-2 px-4 py-3 border-b ${
                isDark ? 'bg-brown-900 border-dark-border' : 'bg-cream-50 border-cream-300'
              }`}
            >
              <HiSparkles className="text-orange-500" size={18} />
              <span className={`font-semibold text-sm ${isDark ? 'text-cream-100' : 'text-brown-800'}`}>
                Recipe AI Assistant
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatWindow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}