import { useMemo } from 'react';
import recipesData from '../../data/RecipesDatabase.json';
import RecipeGrid from './RecipeGrid';
import { useTheme } from '../../context/ThemeContext';

export default function RelatedRecipes({ currentRecipe }) {
  const { isDark } = useTheme();

  const related = useMemo(() => {
    return recipesData
      .filter(r => r.id !== currentRecipe.id && r.cuisine === currentRecipe.cuisine)
      .slice(0, 3);
  }, [currentRecipe]);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-cream-400 dark:border-dark-border">
      <h2 className={`font-serif text-2xl sm:text-3xl font-semibold mb-10 text-center ${
        isDark ? 'text-cream-200' : 'text-brown-800'
      }`}>
        More {currentRecipe.cuisine} Recipes
      </h2>
      <RecipeGrid recipes={related} />
    </section>
  );
}
