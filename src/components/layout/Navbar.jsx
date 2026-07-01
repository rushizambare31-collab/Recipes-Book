import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { NAV_LINKS } from '../../constants';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-orange-400'
        : isDark
          ? 'text-brown-200 hover:text-orange-400'
          : 'text-brown-700 hover:text-orange-400'
    }`;

  const activeIndicator = ({ isActive }) =>
    isActive ? (
      <motion.div
        layoutId="navbar-indicator"
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-400 rounded-full"
      />
    ) : null;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark
        ? 'bg-brown-900/95 border-dark-border'
        : 'bg-cream-100/95 border-cream-400'
    }`}>
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mt-7" id="nav-logo">
            <h1 className="font-serif text-2xl font-bold italic text-orange-400 tracking-tight">
              Food Finder
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                id={`nav-${link.name.toLowerCase()}`}
              >
                {({ isActive }) => (
                  <span className="relative pb-1">
                    {link.name}
                    {link.name === 'Favorites' && favoritesCount > 0 && (
                      <span className="absolute -top-2 -right-4 bg-orange-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {favoritesCount}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-orange-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDark
                  ? 'text-cream-200 hover:bg-brown-800'
                  : 'text-brown-600 hover:bg-cream-300'
              }`}
              id="theme-toggle"
              aria-label="Toggle dark mode"
            >
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.div>
            </button>

            {/* Subscribe Button */}
            <button
              onClick={() => navigate('/contact')}
              className="hidden sm:inline-flex items-center px-5 py-2 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors duration-200 shadow-sm"
              id="nav-subscribe"
            >
              Subscribe
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark ? 'text-cream-200 hover:bg-brown-800' : 'text-brown-700 hover:bg-cream-300'
              }`}
              id="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden border-t ${
              isDark ? 'bg-brown-900 border-dark-border' : 'bg-cream-100 border-cream-400'
            }`}
          >
            <div className="container-editorial py-5 space-y-1.5">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-400/10 text-orange-400'
                        : isDark
                          ? 'text-cream-200 hover:bg-brown-800'
                          : 'text-brown-700 hover:bg-cream-300'
                    }`
                  }
                >
                  <span className="flex items-center justify-between">
                    {link.name}
                    {link.name === 'Favorites' && favoritesCount > 0 && (
                      <span className="bg-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {favoritesCount}
                      </span>
                    )}
                  </span>
                </NavLink>
              ))}
              <button
                onClick={() => { navigate('/contact'); setIsMobileOpen(false); }}
                className="w-full mt-4 px-4 py-3.5 bg-orange-400 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
