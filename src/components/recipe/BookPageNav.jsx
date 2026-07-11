import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const PAGES = [
  { key: 'overview', label: 'Overview', num: '01' },
  { key: 'ingredients', label: 'Ingredients', num: '02' },
  { key: 'instructions', label: 'Instructions', num: '03' },
  { key: 'marathi', label: 'मराठी Recipe', num: '04' },
  { key: 'video', label: 'Recipe Video', num: '05' },
];

export default function BookPageNav({ activePage, setActivePage }) {
  const { isDark } = useTheme();
  const currentIndex = PAGES.findIndex(p => p.key === activePage);

  const goTo = (direction) => {
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < PAGES.length) {
      setActivePage(PAGES[nextIndex].key);
    }
  };

  return (
    <div className={`mt-12 pt-8 border-t ${isDark ? 'border-dark-border' : 'border-cream-400'}`}>
      {/* Page dots and labels */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 flex-wrap">
        {PAGES.map((page, i) => (
          <button
            key={page.key}
            onClick={() => setActivePage(page.key)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                page.key === activePage
                  ? 'bg-orange-400'
                  : isDark
                    ? 'bg-brown-600 group-hover:bg-brown-500'
                    : 'bg-cream-400 group-hover:bg-brown-300'
              }`}
              animate={page.key === activePage ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
            <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 hidden sm:block ${
              page.key === activePage
                ? 'text-orange-400'
                : isDark
                  ? 'text-brown-500 group-hover:text-brown-400'
                  : 'text-brown-400 group-hover:text-brown-600'
            }`}>
              {page.num}
            </span>
          </button>
        ))}
      </div>

      {/* Prev / Current / Next */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => goTo(-1)}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:-translate-x-1 ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'text-orange-400'
          }`}
        >
          <FiArrowLeft size={16} />
          <span className="hidden sm:inline">{currentIndex > 0 ? PAGES[currentIndex - 1].label : ''}</span>
        </button>

        <span className={`label-uppercase text-xs ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
          Page {PAGES[currentIndex]?.num} of 05
        </span>

        <button
          onClick={() => goTo(1)}
          disabled={currentIndex === PAGES.length - 1}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:translate-x-1 ${
            currentIndex === PAGES.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'text-orange-400'
          }`}
        >
          <span className="hidden sm:inline">{currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1].label : ''}</span>
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export { PAGES };
