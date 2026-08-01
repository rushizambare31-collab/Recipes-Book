import { FiSearch } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function SearchBar({ value, onChange, placeholder = 'Search recipes...', className = '' }) {
  const { isDark } = useTheme();

  return (
    <div className={`relative ${className}`}>
      <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${
        isDark ? 'text-brown-500' : 'text-brown-400'
      }`} size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        id="search-bar"
        className={`w-full pl-12 pr-5 py-3.5 rounded-full text-sm font-sans transition-all duration-200 outline-none border ${
          isDark
            ? 'bg-brown-800 border-dark-border text-cream-200 placeholder:text-brown-500 focus:border-orange-400'
            : 'bg-white border-cream-400 text-brown-700 placeholder:text-brown-400 focus:border-orange-400'
        } focus:ring-2 focus:ring-orange-400/20`}
      />
    </div>
  );
}
