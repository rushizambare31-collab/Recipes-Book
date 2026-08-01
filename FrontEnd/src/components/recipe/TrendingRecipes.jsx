import RecipeGrid from './RecipeGrid';

export default function TrendingRecipes({ recipes }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <RecipeGrid recipes={recipes} />
  );
}
