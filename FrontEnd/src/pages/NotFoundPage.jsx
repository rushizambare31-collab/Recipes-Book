import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function NotFoundPage() {
  const { isDark } = useTheme();

  useEffect(() => {
    document.title = '404 — Page Not Found | Food Finder';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center container-editorial">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* 404 Illustration */}
        <div className="mb-10">
          <span className="text-8xl sm:text-9xl font-serif font-bold text-orange-400/20">
            404
          </span>
        </div>

        {/* Emoji */}
        <div className="text-5xl mb-8 animate-float">🍽️</div>

        <h1 className={`font-serif text-3xl sm:text-4xl font-bold mb-5 ${
          isDark ? 'text-cream-200' : 'text-brown-800'
        }`}>
          Recipe Not Found
        </h1>

        <p className={`text-sm sm:text-base leading-relaxed mb-10 ${
          isDark ? 'text-brown-400' : 'text-brown-500'
        }`}>
          Looks like this page has been taken off the menu. Don't worry — there are plenty of delicious recipes waiting for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center px-7 py-3.5 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors"
            id="404-home-btn"
          >
            Return Home
          </Link>
          <Link
            to="/recipes"
            className={`inline-flex items-center px-7 py-3.5 rounded-full text-sm font-semibold border transition-colors ${
              isDark
                ? 'border-dark-border text-cream-200 hover:border-orange-400'
                : 'border-brown-300 text-brown-700 hover:border-orange-400'
            }`}
            id="404-recipes-btn"
          >
            Browse Recipes
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
