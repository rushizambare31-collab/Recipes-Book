import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import recipesData from '../data/RecipesDatabase.json';
import RecipeGrid from '../components/recipe/RecipeGrid';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';

export default function FavoritesPage() {
  const { isDark } = useTheme();
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Favorites — Food Finder';
  }, []);

  const favoriteRecipes = useMemo(() => {
    let recipes = recipesData.filter(r => favorites.includes(r.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      recipes = recipes.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q)
      );
    }
    return recipes;
  }, [favorites, searchQuery]);

  return (
    <div className="container-editorial py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="label-uppercase text-orange-400 mb-3">YOUR COOKBOOK</p>
        <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 ${
          isDark ? 'text-cream-200' : 'text-brown-800'
        }`}>
          Your Favorite Recipes
        </h1>
        <p className={`text-sm sm:text-base max-w-xl leading-relaxed ${
          isDark ? 'text-brown-400' : 'text-brown-500'
        }`}>
          A curated collection of your most-loved modern Indian culinary inspirations.
        </p>
      </motion.div>

      {/* Search */}
      {favorites.length > 0 && (
        <div className="mb-10 max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search your favorites..."
          />
        </div>
      )}

      {/* Content */}
      {favoriteRecipes.length > 0 ? (
        <RecipeGrid recipes={favoriteRecipes} />
      ) : favorites.length > 0 ? (
        <EmptyState
          icon={<FiHeart size={48} />}
          title="No matching favorites"
          description="Try adjusting your search to find saved recipes."
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <EmptyState
          icon="❤️"
          title="No favorites yet"
          description="Start exploring recipes and tap the heart icon to save your favorites here."
          actionLabel="Explore Recipes"
          actionPath="/recipes"
        />
      )}
    </div>
  );
}
