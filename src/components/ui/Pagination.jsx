import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { isDark } = useTheme();

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const baseBtn = `w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200`;

  return (
    <div className="flex items-center justify-center gap-2.5 mt-14">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} ${
          currentPage === 1
            ? 'opacity-40 cursor-not-allowed'
            : isDark
              ? 'text-cream-200 hover:bg-brown-800'
              : 'text-brown-600 hover:bg-cream-300'
        }`}
        id="pagination-prev"
        aria-label="Previous page"
      >
        <FiChevronLeft size={18} />
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${baseBtn} ${isDark ? 'text-cream-200 hover:bg-brown-800' : 'text-brown-600 hover:bg-cream-300'}`}
          >
            1
          </button>
          {start > 2 && (
            <span className={`${baseBtn} cursor-default ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>…</span>
          )}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseBtn} ${
            page === currentPage
              ? 'bg-orange-400 text-white shadow-sm'
              : isDark
                ? 'text-cream-200 hover:bg-brown-800'
                : 'text-brown-600 hover:bg-cream-300'
          }`}
          id={`pagination-page-${page}`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className={`${baseBtn} cursor-default ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${baseBtn} ${isDark ? 'text-cream-200 hover:bg-brown-800' : 'text-brown-600 hover:bg-cream-300'}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} ${
          currentPage === totalPages
            ? 'opacity-40 cursor-not-allowed'
            : isDark
              ? 'text-cream-200 hover:bg-brown-800'
              : 'text-brown-600 hover:bg-cream-300'
        }`}
        id="pagination-next"
        aria-label="Next page"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}
