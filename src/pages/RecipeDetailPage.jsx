import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPrinter, FiChevronRight, FiClock, FiUsers, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GiCookingPot } from 'react-icons/gi';
import { useReactToPrint } from 'react-to-print';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../hooks/useRecipes';
import FavoriteButton from '../components/ui/FavoriteButton';
import RelatedRecipes from '../components/recipe/RelatedRecipes';
import PrintRecipeTemplate from '../components/recipe/PrintRecipeTemplate';
import { getRecipeImage } from '../components/recipe/RecipeCard';

export default function RecipeDetailPage() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const { getRecipeBySlug } = useRecipes();
  const recipe = getRecipeBySlug(slug);
  const printRef = useRef();
  const [activeView, setActiveView] = useState('overview');

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: recipe ? `${recipe.name} - Food Finder Recipe` : 'Recipe',
  });

  useEffect(() => {
    if (recipe) {
      document.title = `${recipe.name} — Food Finder`;
    }
    window.scrollTo(0, 0);
  }, [recipe, slug]);

  if (!recipe) {
    return (
      <div className="container-editorial py-20 text-center">
        <h1 className="font-serif text-3xl mb-6">Recipe Not Found</h1>
        <Link to="/recipes" className="text-orange-400 hover:underline">
          ← Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-editorial pt-8">
        <nav className={`flex items-center gap-2 text-xs ${
          isDark ? 'text-brown-500' : 'text-brown-400'
        }`}>
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <FiChevronRight size={12} />
          <Link to="/recipes" className="hover:text-orange-400 transition-colors">{recipe.cuisine} Cuisine</Link>
          <FiChevronRight size={12} />
          <span className="text-orange-400 font-medium">{recipe.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container-editorial py-10 lg:py-12">
        {activeView === 'overview' ? (
          /* ========== OVERVIEW VIEW ========== */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Left - Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src={getRecipeImage(recipe.slug)}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 sm:p-10">
                  <span className="inline-block px-3 py-1 bg-orange-400 text-white text-[10px] font-semibold uppercase tracking-wider rounded-md mb-3">
                    CHEF'S SPECIAL
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                    Heritage {recipe.name}
                  </h1>
                  <p className="text-sm text-white/80 max-w-md leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>

              {/* Right - Recipe Card */}
              <div className={`rounded-3xl p-7 sm:p-9 ${
                isDark ? 'bg-brown-800' : 'bg-white'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-serif text-2xl text-orange-400 italic mb-1.5">
                      The Recipe Card
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
                      Essential details for the perfect cook.
                    </p>
                  </div>
                  <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${
                    isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'
                  }`}>
                    PAGE 01
                  </span>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10">
                  {[
                    { label: 'CUISINE', value: recipe.cuisine },
                    { label: 'PROTEIN', value: recipe.protein },
                    { label: 'CALORIES', value: recipe.nutrition.calories },
                    { label: 'DIFFICULTY', value: recipe.difficulty },
                    { label: 'COOKING TIME', value: recipe.cookTime },
                    { label: 'SERVES', value: `${recipe.servings} People` },
                  ].map((item, i) => (
                    <div key={i} className={`py-3 ${i < 4 ? `border-b ${isDark ? 'border-dark-border' : 'border-cream-400'}` : ''}`}>
                      <p className="label-uppercase text-brown-400 mb-1.5">{item.label}</p>
                      <p className={`font-serif text-xl font-semibold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Next Link */}
                <div className="mt-10 text-right">
                  <button
                    onClick={() => setActiveView('details')}
                    className="inline-flex items-center gap-2 text-orange-400 text-sm font-medium hover:gap-3 transition-all"
                  >
                    Next: Ingredients <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========== DETAILS VIEW ========== */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Left - Ingredients */}
              <div className={`rounded-3xl p-7 sm:p-9 ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                <div className="flex items-start justify-between mb-8">
                  <h2 className="font-serif text-2xl text-orange-400 italic">Ingredients</h2>
                  <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${
                    isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'
                  }`}>
                    PAGE 02
                  </span>
                </div>

                <ul className="space-y-3.5">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${
                      isDark ? 'text-cream-200' : 'text-brown-700'
                    }`}>
                      <span className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded border ${
                        isDark ? 'border-dark-border' : 'border-cream-400'
                      }`} />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - Instructions */}
              <div className={`rounded-3xl p-7 sm:p-9 ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                <div className="flex items-start justify-between mb-8">
                  <h2 className="font-serif text-2xl text-orange-400 italic">Instructions</h2>
                  <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${
                    isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'
                  }`}>
                    PAGE 03
                  </span>
                </div>

                <div className="space-y-7">
                  {recipe.instructions.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className={`font-serif text-2xl font-bold flex-shrink-0 w-8 ${
                        isDark ? 'text-brown-600' : 'text-cream-400'
                      }`}>
                        {i + 1}
                      </span>
                      <div>
                        <h4 className={`font-serif text-base font-semibold mb-2 ${
                          isDark ? 'text-cream-200' : 'text-brown-800'
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          isDark ? 'text-brown-400' : 'text-brown-500'
                        }`}>
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chef's Notes */}
                {recipe.chefNotes && (
                  <div className={`mt-10 p-6 rounded-2xl ${
                    isDark ? 'bg-orange-400/10 border border-orange-400/20' : 'bg-orange-50 border border-orange-100'
                  }`}>
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      📍 CHEF'S NOTE
                    </p>
                    <p className={`text-sm italic leading-relaxed ${
                      isDark ? 'text-cream-200' : 'text-brown-700'
                    }`}>
                      "{recipe.chefNotes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Back button */}
            <div className="mt-8">
              <button
                onClick={() => setActiveView('overview')}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                  isDark ? 'text-cream-200 hover:text-orange-400' : 'text-brown-700 hover:text-orange-400'
                }`}
              >
                <FiArrowLeft size={16} /> Back to Overview
              </button>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 pt-10 border-t border-cream-400 dark:border-dark-border">
          <button
            onClick={handlePrint}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-colors ${
              isDark
                ? 'bg-brown-800 text-cream-200 hover:bg-brown-700'
                : 'bg-brown-800 text-white hover:bg-brown-700'
            }`}
            id="print-recipe-btn"
          >
            <FiPrinter size={16} />
            Print Recipe Card
          </button>
          <div className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-sm font-semibold transition-colors ${
            isDark
              ? 'border-dark-border text-cream-200 hover:border-orange-400'
              : 'border-brown-300 text-brown-700 hover:border-orange-400'
          }`}>
            <FavoriteButton recipeId={recipe.id} size={16} />
            Save to Cookbook
          </div>
        </div>

        {/* Tags */}
        {recipe.tags && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {recipe.tags.map((tag, i) => (
              <span key={i} className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                isDark
                  ? 'border-dark-border text-brown-400'
                  : 'border-cream-400 text-brown-500'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Recipes */}
        <RelatedRecipes currentRecipe={recipe} />
      </div>

      {/* Hidden Print Template */}
      <PrintRecipeTemplate ref={printRef} recipe={recipe} />
    </div>
  );
}
