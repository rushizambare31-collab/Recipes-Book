export function parseCookTime(timeStr) {
  if (!timeStr) return 0;
  const matches = timeStr.match(/(\d+)/);
  return matches ? parseInt(matches[1], 10) : 0;
}

export function getUniqueValues(recipes, key) {
  return [...new Set(recipes.map(r => r[key]))].sort();
}

export function getRelatedRecipes(recipes, currentRecipe, limit = 4) {
  return recipes
    .filter(r => r.id !== currentRecipe.id && r.cuisine === currentRecipe.cuisine)
    .slice(0, limit);
}

export function formatCookTime(timeStr) {
  return timeStr || '0 mins';
}

export function getDifficultyOrder(difficulty) {
  const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
  return order[difficulty] || 2;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
