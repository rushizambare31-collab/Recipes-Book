import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { CUISINES, DIFFICULTIES, SORT_OPTIONS } from '../../constants';

const COOK_TIME_OPTIONS = ['All', 'Under 30 min', '30–60 min', 'Over 60 min'];
const REGION_OPTIONS = ['All', 'Western India', 'North India', 'South India', 'East India'];

export default function FilterPanel({
  selectedRegion, setSelectedRegion,
  selectedCuisine, setSelectedCuisine,
  selectedDifficulty, setSelectedDifficulty,
  selectedCookTime, setSelectedCookTime,
  sortBy, setSortBy,
  onClear,
  resultCount,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  const hasActiveFilters =
    selectedRegion !== 'All' ||
    selectedCuisine !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedCookTime !== 'All';

  const FilterSection = ({ title, options, selected, onSelect }) => (
    <div className="mb-7">
      <h4 className="label-uppercase text-orange-400 mb-3.5">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
              selected === option
                ? 'bg-orange-400 text-white border-orange-400'
                : isDark
                  ? 'text-cream-200 border-dark-border hover:border-orange-400'
                  : 'text-brown-600 border-cream-400 hover:border-orange-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const filterContent = (
    <>
      <FilterSection title="Region" options={REGION_OPTIONS} selected={selectedRegion} onSelect={setSelectedRegion} />
      <FilterSection title="Cuisine" options={CUISINES} selected={selectedCuisine} onSelect={setSelectedCuisine} />
      <FilterSection title="Difficulty" options={DIFFICULTIES} selected={selectedDifficulty} onSelect={setSelectedDifficulty} />
      <FilterSection title="Cooking Time" options={COOK_TIME_OPTIONS} selected={selectedCookTime} onSelect={setSelectedCookTime} />

      {/* Sort */}
      <div className="mb-7">
        <h4 className="label-uppercase text-orange-400 mb-3.5">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
            isDark
              ? 'bg-brown-800 border-dark-border text-cream-200 focus:border-orange-400'
              : 'bg-white border-cream-400 text-brown-700 focus:border-orange-400'
          }`}
          id="sort-select"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="w-full py-2 text-sm font-medium text-orange-400 hover:text-orange-500 transition-colors"
          id="clear-filters"
        >
          Clear all filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block w-64 flex-shrink-0 sticky top-20 self-start rounded-2xl p-7 ${
        isDark ? 'bg-brown-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-7">
          <h3 className={`font-serif text-lg font-semibold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
            Filters
          </h3>
          <span className={`text-xs ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
            {resultCount} recipes
          </span>
        </div>
        {filterContent}
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
            hasActiveFilters
              ? 'bg-orange-400 text-white border-orange-400'
              : isDark
                ? 'text-cream-200 border-dark-border hover:border-orange-400'
                : 'text-brown-600 border-cream-400 hover:border-orange-400'
          }`}
          id="mobile-filter-toggle"
        >
          <FiFilter size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-white rounded-full" />
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] z-50 overflow-y-auto p-7 lg:hidden ${
                isDark ? 'bg-brown-900' : 'bg-cream-100'
              }`}
            >
              <div className="flex items-center justify-between mb-7">
                <h3 className={`font-serif text-lg font-semibold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                  Filters
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-brown-800 text-cream-200' : 'hover:bg-cream-300 text-brown-600'
                  }`}
                >
                  <FiX size={20} />
                </button>
              </div>
              {filterContent}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 py-3 bg-orange-400 text-white text-sm font-semibold rounded-lg hover:bg-orange-500 transition-colors"
              >
                Show {resultCount} recipes
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
