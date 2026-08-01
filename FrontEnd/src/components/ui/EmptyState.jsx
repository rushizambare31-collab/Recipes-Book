import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function EmptyState({
  icon,
  title = 'Nothing here yet',
  description = 'Try adjusting your search or filters.',
  actionLabel,
  actionPath,
  onAction,
}) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {icon && (
        <div className={`text-5xl mb-8 ${isDark ? 'text-brown-600' : 'text-brown-300'}`}>
          {icon}
        </div>
      )}
      <h3 className={`font-serif text-2xl font-semibold mb-4 ${
        isDark ? 'text-cream-200' : 'text-brown-700'
      }`}>
        {title}
      </h3>
      <p className={`text-sm max-w-md mb-8 leading-relaxed ${
        isDark ? 'text-brown-500' : 'text-brown-400'
      }`}>
        {description}
      </p>
      {actionLabel && (actionPath ? (
        <Link
          to={actionPath}
          className="inline-flex items-center px-7 py-3 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors"
        >
          {actionLabel}
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          className="inline-flex items-center px-7 py-3 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors"
        >
          {actionLabel}
        </button>
      ) : null)}
    </motion.div>
  );
}
