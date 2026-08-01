import { useState, useMemo, useCallback } from 'react';
import recipesData from '../data/RecipesDatabase.json';
import { parseCookTime, getDifficultyOrder } from '../utils/helpers';
import { RECIPES_PER_PAGE } from '../constants';

export function useRecipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCookTime, setSelectedCookTime] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);

  const allRecipes = useMemo(() => recipesData.map(r => ({
    ...r,
    name: r.languages?.en?.name || r.name,
    description: r.languages?.en?.description || r.description,
    ingredients: r.languages?.en?.ingredients || r.ingredients,
    instructions: r.languages?.en?.instructions || r.instructions,
    chefNotes: r.languages?.en?.chefNotes || r.chefNotes,
  })), []);

  const filteredRecipes = useMemo(() => {
    let result = [...allRecipes];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query) ||
        r.region.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Filter by region
    if (selectedRegion !== 'All') {
      result = result.filter(r => r.region === selectedRegion);
    }

    // Filter by cuisine
    if (selectedCuisine !== 'All') {
      result = result.filter(r => r.cuisine === selectedCuisine);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      result = result.filter(r => r.difficulty === selectedDifficulty);
    }

    // Filter by cook time
    if (selectedCookTime !== 'All') {
      const ranges = {
        'Under 30 min': [0, 30],
        '30–60 min': [30, 60],
        'Over 60 min': [60, Infinity],
      };
      const range = ranges[selectedCookTime];
      if (range) {
        result = result.filter(r => {
          const time = parseCookTime(r.cookTime);
          return time >= range[0] && time < range[1];
        });
      }
    }

    // Sort
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'cookTime':
        result.sort((a, b) => parseCookTime(a.cookTime) - parseCookTime(b.cookTime));
        break;
      case 'difficulty':
        result.sort((a, b) => getDifficultyOrder(a.difficulty) - getDifficultyOrder(b.difficulty));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [allRecipes, searchQuery, selectedRegion, selectedCuisine, selectedDifficulty, selectedCookTime, sortBy]);

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
    return filteredRecipes.slice(startIndex, startIndex + RECIPES_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  const featuredRecipes = useMemo(() =>
    allRecipes.filter(r => r.featured), [allRecipes]);

  const trendingRecipes = useMemo(() =>
    allRecipes.filter(r => r.trending), [allRecipes]);

  const getRecipeBySlug = useCallback((slug) =>
    allRecipes.find(r => r.slug === slug), [allRecipes]);

  const getRecipeById = useCallback((id) =>
    allRecipes.find(r => r.id === id), [allRecipes]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedCuisine('All');
    setSelectedDifficulty('All');
    setSelectedCookTime('All');
    setSortBy('popularity');
    setCurrentPage(1);
  }, []);

  // Reset to page 1 when filters change
  const handleFilterChange = useCallback((setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  }, []);

  return {
    allRecipes,
    filteredRecipes,
    paginatedRecipes,
    featuredRecipes,
    trendingRecipes,
    searchQuery,
    setSearchQuery: handleFilterChange(setSearchQuery),
    selectedRegion,
    setSelectedRegion: handleFilterChange(setSelectedRegion),
    selectedCuisine,
    setSelectedCuisine: handleFilterChange(setSelectedCuisine),
    selectedDifficulty,
    setSelectedDifficulty: handleFilterChange(setSelectedDifficulty),
    selectedCookTime,
    setSelectedCookTime: handleFilterChange(setSelectedCookTime),
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    clearFilters,
    getRecipeBySlug,
    getRecipeById,
  };
}
