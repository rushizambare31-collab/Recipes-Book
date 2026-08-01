import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../hooks/useRecipes';
import SearchBar from '../components/ui/SearchBar';
import RecipeGrid from '../components/recipe/RecipeGrid';
import FilterPanel from '../components/recipe/FilterPanel';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { FiSearch } from 'react-icons/fi';
import { scrollToTop } from '../utils/helpers';

export default function RecipesPage() {
  const { isDark } = useTheme();
  const {
    paginatedRecipes,
    filteredRecipes,
    searchQuery, setSearchQuery,
    selectedRegion, setSelectedRegion,
    selectedCuisine, setSelectedCuisine,
    selectedDifficulty, setSelectedDifficulty,
    selectedCookTime, setSelectedCookTime,
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    totalPages,
    clearFilters,
  } = useRecipes();

  useEffect(() => {
    document.title = 'Recipes — Food Finder';
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="container-editorial py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="label-uppercase text-orange-400 mb-3">OUR COLLECTION</p>
        <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 ${
          isDark ? 'text-cream-200' : 'text-brown-800'
        }`}>
          All Recipes
        </h1>
        <p className={`text-sm sm:text-base max-w-xl leading-relaxed ${
          isDark ? 'text-brown-400' : 'text-brown-500'
        }`}>
          Browse our curated collection of authentic Indian recipes from across the subcontinent.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-10 max-w-xl">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by recipe name, cuisine, or region..."
        />
      </div>

      {/* Main Content */}
      <div className="flex gap-10 lg:gap-12">
        {/* Filter Panel */}
        <FilterPanel
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedCookTime={selectedCookTime}
          setSelectedCookTime={setSelectedCookTime}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClear={clearFilters}
          resultCount={filteredRecipes.length}
        />

        {/* Recipe Grid */}
        <div className="flex-1 min-w-0">
          {/* Mobile Sort/Filter Row */}
          <div className="flex items-center justify-between gap-4 mb-8 lg:hidden">
            <FilterPanel
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedCuisine={selectedCuisine}
              setSelectedCuisine={setSelectedCuisine}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedCookTime={selectedCookTime}
              setSelectedCookTime={setSelectedCookTime}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClear={clearFilters}
              resultCount={filteredRecipes.length}
            />
            <span className={`text-xs ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
              {filteredRecipes.length} recipes
            </span>
          </div>

          {paginatedRecipes.length > 0 ? (
            <>
              <RecipeGrid recipes={paginatedRecipes} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState
              icon={<FiSearch size={48} />}
              title="No recipes found"
              description="Try adjusting your search query or clearing some filters to see more results."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
