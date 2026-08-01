import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoriteButton({ recipeId, size = 18, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(recipeId);

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      whileTap={{ scale: 0.8 }}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isLiked
          ? 'bg-orange-400/15 text-orange-400'
          : 'bg-white/80 dark:bg-brown-800/80 text-brown-400 hover:text-orange-400 hover:bg-orange-400/10'
      } backdrop-blur-sm ${className}`}
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.div
        key={isLiked ? 'filled' : 'outline'}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      >
        {isLiked ? <FaHeart size={size} /> : <FiHeart size={size} />}
      </motion.div>
    </motion.button>
  );
}
