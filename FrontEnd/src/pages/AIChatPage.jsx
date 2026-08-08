import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { GiChefToque, GiCookingPot, GiSpoon, GiChiliPepper } from 'react-icons/gi';
import { useTheme } from '../context/ThemeContext';
import { useAIChat } from '../hooks/useAIChat';

const ICONS = [
    { key: 'chef', Icon: GiChefToque, fromX: -160, fromY: -60, rot: -16, delay: 0, pos: { left: '4%', top: '14%' } },
    { key: 'pot', Icon: GiCookingPot, fromX: 170, fromY: -50, rot: 14, delay: 150, pos: { right: '4%', top: '18%' } },
    { key: 'spoon', Icon: GiSpoon, fromX: -170, fromY: 60, rot: 12, delay: 300, pos: { left: '3%', bottom: '18%' } },
    { key: 'pepper', Icon: GiChiliPepper, fromX: 175, fromY: 55, rot: -18, delay: 450, pos: { right: '5%', bottom: '14%' } },
];

export default function AIChatPage() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { messages, sendMessage, loading, error, historyLoading } = useAIChat();
    const [input, setInput] = useState('');
    const [played, setPlayed] = useState(false);
    const messagesEndRef = useRef(null);

    const hasMessages = messages.length > 0;

    useEffect(() => {
        const t = setTimeout(() => setPlayed(true), 50);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDark ? 'bg-brown-900' : 'bg-cream-100'}`}>
            {/* Top bar */}
            <div className={`sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-dark-border bg-brown-900/95' : 'border-cream-300 bg-cream-100/95'
                } backdrop-blur-md`}>
                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-cream-200 hover:text-orange-400' : 'text-brown-700 hover:text-orange-500'
                        }`}
                >
                    <FiArrowLeft size={16} />
                    Back
                </button>
                <div className="flex items-center gap-2">
                    <HiSparkles className="text-orange-500" size={18} />
                    <span className={`font-semibold text-sm ${isDark ? 'text-cream-100' : 'text-brown-800'}`}>
                        Recipe AI Assistant
                    </span>
                </div>



                <div style={{ width: 60 }} />

            </div>
            <div className={`border-b px-6 ${isDark ? 'border-dark-border bg-brown-900/95' : 'border-cream-300 bg-cream-100/95'
                } backdrop-blur-md`}>
                <h1 className={`font-serif text-center p-5 italic text-3xl md:text-4xl font-bold ${isDark ? 'text-cream-100' : 'text-brown-800'}`}>
                    What should I make today?
                </h1>
            </div>
            {/* Main area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">

                {!hasMessages ? (
                    /* EMPTY STATE — centered heading + icons, like ChatGPT's first screen */
                    <div className="flex-1 flex items-center justify-center relative px-6">
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

                        <div className="text-center relative z-10 max-w-xl">
                            <p className={`text-xs font-semibold tracking-wide uppercase mb-3 ${isDark ? 'text-orange-400' : 'text-orange-500'}`}>
                                Recipe AI Assistant
                            </p>
                            <h1 className={`font-serif italic text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-cream-100' : 'text-brown-50'}`}>
                                What should I make today?
                            </h1>

                            {/* Input right here in empty state, ChatGPT-style */}
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="e.g. aloo, tamatar hai, kya banau?"
                                    className={`flex-1 border rounded-full px-5 py-3 outline-none text-sm focus:border-orange-400 ${isDark ? 'bg-brown-800 border-dark-border text-cream-100 placeholder:text-brown-500' : 'bg-white border-cream-300'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-full disabled:opacity-50 text-sm font-medium shrink-0"
                                >
                                    Send
                                </button>
                            </form>
                        </div>



                    </div>
                ) : (
                    /* CONVERSATION STATE — full-width scrolling messages, like ChatGPT */
                    <>
                        <div className="flex-1 overflow-y-auto">
                            <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-orange-500 text-white'
                                                : isDark
                                                    ? 'bg-brown-800 text-cream-100'
                                                    : 'bg-white border border-cream-300 text-brown-800'
                                                }`}
                                        >
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="flex justify-start">
                                        <div className={`rounded-2xl px-5 py-3 text-sm ${isDark ? 'bg-brown-800 text-brown-300' : 'bg-white border border-cream-300 text-gray-500'}`}>
                                            Soch raha hoon...
                                        </div>
                                    </div>
                                )}

                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Bottom input bar, sticky */}
                        <div className={`sticky bottom-0 border-t px-6 py-4 ${isDark ? 'border-dark-border bg-brown-900/95' : 'border-cream-300 bg-cream-100/95'} backdrop-blur-md`}>
                            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Apna sawaal likho..."
                                    className={`flex-1 border rounded-full px-5 py-3 outline-none text-sm focus:border-orange-400 ${isDark ? 'bg-brown-800 border-dark-border text-cream-100 placeholder:text-brown-500' : 'bg-white border-cream-300'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-full disabled:opacity-50 text-sm font-medium shrink-0"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

