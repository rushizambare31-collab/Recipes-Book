import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isDark
          ? 'text-cream-200 hover:bg-brown-800'
          : 'text-brown-600 hover:bg-cream-300'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </motion.div>
    </motion.button>
  );
}
