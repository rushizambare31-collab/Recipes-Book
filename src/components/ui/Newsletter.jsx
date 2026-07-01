import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function Newsletter({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (variant === 'footer') {
    return (
      <div>
        <p className={`text-xs mb-4 leading-relaxed ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
          Get curated recipes and editorial pieces delivered weekly.
        </p>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className={`flex-1 px-4 py-2.5 text-xs rounded-l-lg border outline-none transition-colors ${
              isDark
                ? 'bg-brown-800 border-dark-border text-cream-200 placeholder:text-brown-500 focus:border-orange-400'
                : 'bg-white border-cream-400 text-brown-700 placeholder:text-brown-400 focus:border-orange-400'
            }`}
            id="footer-newsletter-input"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-orange-400 text-white rounded-r-lg hover:bg-orange-500 transition-colors"
            id="footer-newsletter-submit"
            aria-label="Subscribe"
          >
            {submitted ? '✓' : <FiSend size={14} />}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-10 sm:p-14 text-center ${
      isDark ? 'bg-brown-800' : 'bg-cream-200'
    }`}>
      <h3 className={`font-serif text-2xl sm:text-3xl font-semibold mb-4 ${
        isDark ? 'text-cream-200' : 'text-brown-700'
      }`}>
        Get our newsletter
      </h3>
      <p className={`text-sm mb-8 max-w-md mx-auto leading-relaxed ${
        isDark ? 'text-brown-400' : 'text-brown-500'
      }`}>
        Subscribe for curated recipes, cooking tips, and exclusive editorial content delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className={`flex-1 px-5 py-3 text-sm rounded-l-full border outline-none transition-colors ${
            isDark
              ? 'bg-brown-900 border-dark-border text-cream-200 placeholder:text-brown-500 focus:border-orange-400'
              : 'bg-white border-cream-400 text-brown-700 placeholder:text-brown-400 focus:border-orange-400'
          }`}
          id="newsletter-input"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-orange-400 text-white text-sm font-semibold rounded-r-full hover:bg-orange-500 transition-colors"
          id="newsletter-submit"
        >
          {submitted ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
