import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { CUISINES } from '../../constants';

export default function RegionCards({ selected, onSelect }) {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {CUISINES.map(cuisine => (
        <motion.button
          key={cuisine}
          onClick={() => onSelect(cuisine)}
          whileTap={{ scale: 0.95 }}
          className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
            selected === cuisine
              ? 'bg-orange-400 text-white border-orange-400 shadow-sm'
              : isDark
                ? 'bg-transparent text-cream-200 border-dark-border hover:border-orange-400 hover:text-orange-400'
                : 'bg-transparent text-brown-600 border-cream-400 hover:border-orange-400 hover:text-orange-400'
          }`}
          id={`cuisine-filter-${cuisine.toLowerCase().replace(/\s/g, '-')}`}
        >
          {cuisine}
        </motion.button>
      ))}
    </div>
  );
}
