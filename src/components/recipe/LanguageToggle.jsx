import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function LanguageToggle({ language, setLanguage }) {
  const { isDark } = useTheme();

  return (
    <div className={`inline-flex items-center rounded-full p-1 ${
      isDark ? 'bg-brown-800' : 'bg-cream-200'
    }`}>
      {[
        { key: 'en', label: 'English' },
        { key: 'mr', label: 'मराठी' },
      ].map((lang) => (
        <button
          key={lang.key}
          onClick={() => setLanguage(lang.key)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
            language === lang.key
              ? 'text-white'
              : isDark
                ? 'text-brown-400 hover:text-cream-200'
                : 'text-brown-500 hover:text-brown-700'
          }`}
        >
          {language === lang.key && (
            <motion.div
              layoutId="lang-toggle"
              className="absolute inset-0 bg-orange-400 rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
