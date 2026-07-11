import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPrinter, FiChevronRight, FiClock, FiUsers, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GiCookingPot } from 'react-icons/gi';
import { useReactToPrint } from 'react-to-print';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../hooks/useRecipes';
import FavoriteButton from '../components/ui/FavoriteButton';
import RelatedRecipes from '../components/recipe/RelatedRecipes';
import PrintRecipeTemplate from '../components/recipe/PrintRecipeTemplate';
import { getRecipeImage } from '../components/recipe/RecipeCard';
import LanguageToggle from '../components/recipe/LanguageToggle';
import VideoPlayer from '../components/recipe/VideoPlayer';
import BookPageNav from '../components/recipe/BookPageNav';

// Book page flip animation variants
const pageVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    rotateY: direction < 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
};

const pageTransition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1],
  duration: 0.4,
};

const PAGES_ORDER = ['overview', 'ingredients', 'instructions', 'marathi', 'video'];

export default function RecipeDetailPage() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const { getRecipeBySlug } = useRecipes();
  const recipe = getRecipeBySlug(slug);
  const printRef = useRef();
  const [activePage, setActivePage] = useState('overview');
  const [direction, setDirection] = useState(0);
  const [language, setLanguage] = useState('en');

  const handlePageChange = (newPage) => {
    const oldIndex = PAGES_ORDER.indexOf(activePage);
    const newIndex = PAGES_ORDER.indexOf(newPage);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActivePage(newPage);
  };

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

  // Reset to overview when navigating to a new recipe
  useEffect(() => {
    setActivePage('overview');
    setLanguage('en');
  }, [slug]);

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

  // Get language-specific data
  const lang = recipe.languages?.[language] || recipe.languages?.en || {};
  const recipeName = lang.name || recipe.name;
  const recipeDesc = lang.description || recipe.description;
  const recipeIngredients = lang.ingredients || recipe.ingredients;
  const recipeInstructions = lang.instructions || recipe.instructions;
  const recipeChefNotes = lang.chefNotes || recipe.chefNotes;

  // Marathi-specific data (always from mr)
  const mr = recipe.languages?.mr || {};

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-editorial pt-8">
        <nav className={`flex items-center gap-2 text-xs ${isDark ? 'text-brown-500' : 'text-brown-400'
          }`}>
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <FiChevronRight size={12} />
          <Link to="/recipes" className="hover:text-orange-400 transition-colors">{recipe.cuisine} Cuisine</Link>
          <FiChevronRight size={12} />
          <span className="text-orange-400 font-medium">{recipe.name}</span>
        </nav>
      </div>

      {/* Language Toggle + Header */}
      <div className="container-editorial pt-6 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className={`font-serif text-2xl sm:text-3xl font-bold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
              {recipeName}
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
              {recipe.cuisine} • {recipe.difficulty} • {recipe.cookTime}
            </p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
      </div>

      {/* Main Content with Book-Flip Animation */}
      <div className="container-editorial py-6 lg:py-8" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activePage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            style={{ transformStyle: 'preserve-3d' }}
          >

            {/* ========== PAGE 01: OVERVIEW ========== */}
            {activePage === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-1">
                {/* Left - Image */}
                <div className="relative h-[550px] w-[650px] w-full lg:w-[550px] rounded-3xl overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipeName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 sm:p-10">
                    <span className="inline-block px-3 py-1 bg-orange-400 text-white text-[10px] font-semibold uppercase tracking-wider rounded-md mb-3">
                      CHEF'S SPECIAL
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                      {recipeName}
                    </h2>
                    <p className="text-sm text-white/80 max-w-md leading-relaxed">
                      {recipeDesc}
                    </p>
                  </div>
                </div>

                {/* Right - Recipe Card */}
                <div className={`rounded-3xl h-[550px] w-[550px] p-7 sm:p-9 ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="font-serif text-2xl text-orange-400 italic mb-1.5">
                        The Recipe Card
                      </h2>
                      <p className={`text-sm ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
                        Essential details for the perfect cook.
                      </p>
                    </div>
                    <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'}`}>
                      PAGE 01
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10">
                    {[
                      { label: 'CUISINE', value: recipe.cuisine },
                      { label: 'PROTEIN', value: recipe.protein || recipe.nutrition?.protein },
                      { label: 'CALORIES', value: recipe.nutrition?.calories },
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
                      onClick={() => handlePageChange('ingredients')}
                      className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ease-in-out hover:translate-x-1 text-orange-400"
                    >
                      Next: Ingredients <FiArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========== PAGE 02: INGREDIENTS ========== */}
            {activePage === 'ingredients' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className={`rounded-3xl p-7 sm:p-9 flex flex-col ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                  <div className="flex items-start justify-between mb-8">
                    <h2 className="font-serif text-2xl text-orange-400 italic">
                      {language === 'mr' ? 'साहित्य' : 'Ingredients'}
                    </h2>
                    <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'}`}>
                      PAGE 02
                    </span>
                  </div>

                  <ul className="flex-1 space-y-3.5 pr-2">
                    {recipeIngredients.map((ing, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                        <span className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded border ${isDark ? 'border-dark-border' : 'border-cream-400'}`} />
                        {ing}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => handlePageChange('overview')}
                      className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:-translate-x-1"
                    >
                      <FiArrowLeft size={16} /> Overview
                    </button>
                    <button
                      onClick={() => handlePageChange('instructions')}
                      className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:translate-x-1"
                    >
                      Instructions <FiArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Nutrition Card */}
                <div className={`rounded-3xl p-7 sm:p-9 ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                  <h3 className={`font-serif text-xl font-semibold mb-6 ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                    {language === 'mr' ? 'पौष्टिक माहिती' : 'Nutrition Facts'}
                  </h3>
                  <div className="space-y-4">
                    {recipe.nutrition && Object.entries(recipe.nutrition).map(([key, value]) => (
                      <div key={key} className={`flex justify-between py-3 border-b ${isDark ? 'border-dark-border' : 'border-cream-400'}`}>
                        <span className={`text-sm capitalize ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>{key}</span>
                        <span className={`text-sm font-semibold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========== PAGE 03: INSTRUCTIONS ========== */}
            {activePage === 'instructions' && (
              <div className={`rounded-3xl p-7 sm:p-9 ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                <div className="flex items-start justify-between mb-8">
                  <h2 className="font-serif text-2xl text-orange-400 italic">
                    {language === 'mr' ? 'कृती' : 'Instructions'}
                  </h2>
                  <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'}`}>
                    PAGE 03
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-7">
                    {recipeInstructions.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <span className={`font-serif text-2xl font-bold flex-shrink-0 w-8 ${isDark ? 'text-brown-600' : 'text-cream-400'}`}>
                          {i + 1}
                        </span>
                        <div>
                          <h4 className={`font-serif text-base font-semibold mb-2 ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                            {step.title}
                          </h4>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
                            {step.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chef's Notes */}
                  <div>
                    {recipeChefNotes && (
                      <div className={`p-5 rounded-2xl ${isDark ? 'bg-orange-400/10 border border-orange-400/20' : 'bg-orange-50 border border-orange-100'}`}>
                        <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          📍 {language === 'mr' ? 'शेफची टीप' : "CHEF'S NOTE"}
                        </p>
                        <p className={`text-sm italic leading-relaxed ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                          "{recipeChefNotes}"
                        </p>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className={`mt-6 grid grid-cols-2 gap-4`}>
                      {[
                        { icon: <FiClock size={16} />, label: language === 'mr' ? 'तयारी' : 'Prep', value: recipe.prepTime },
                        { icon: <GiCookingPot size={16} />, label: language === 'mr' ? 'स्वयंपाक' : 'Cook', value: recipe.cookTime },
                        { icon: <FiUsers size={16} />, label: language === 'mr' ? 'सर्विंग' : 'Serves', value: recipe.servings },
                      ].map((item, i) => (
                        <div key={i} className={`p-3 rounded-xl ${isDark ? 'bg-brown-900' : 'bg-cream-200'}`}>
                          <div className="text-orange-400 mb-1">{item.icon}</div>
                          <p className={`text-xs ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>{item.label}</p>
                          <p className={`text-sm font-semibold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => handlePageChange('ingredients')}
                    className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:-translate-x-1"
                  >
                    <FiArrowLeft size={16} /> Ingredients
                  </button>
                  <button
                    onClick={() => handlePageChange('marathi')}
                    className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:translate-x-1"
                  >
                    मराठी Recipe <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ========== PAGE 04: MARATHI RECIPE ========== */}
            {activePage === 'marathi' && (
              <div className={`rounded-3xl p-7 sm:p-9 ${isDark ? 'bg-brown-800' : 'bg-white'}`}>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="font-serif text-2xl text-orange-400 italic mb-1">
                      {mr.name || recipe.name}
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
                      मराठी मध्ये पाककृती
                    </p>
                  </div>
                  <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'}`}>
                    PAGE 04
                  </span>
                </div>

                {/* Marathi Description */}
                <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                  {mr.description || recipe.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Marathi Ingredients */}
                  <div>
                    <h3 className={`font-serif text-lg font-semibold mb-4 ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                      साहित्य
                    </h3>
                    <ul className="space-y-3">
                      {(mr.ingredients || recipe.ingredients).map((ing, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                          <span className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded border ${isDark ? 'border-dark-border' : 'border-cream-400'}`} />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Marathi Instructions */}
                  <div>
                    <h3 className={`font-serif text-lg font-semibold mb-4 ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                      कृती
                    </h3>
                    <div className="space-y-5">
                      {(mr.instructions || recipe.instructions).map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span className={`font-serif text-xl font-bold flex-shrink-0 w-7 ${isDark ? 'text-brown-600' : 'text-cream-400'}`}>
                            {i + 1}
                          </span>
                          <div>
                            <h4 className={`font-serif text-base font-semibold mb-1 ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                              {step.title}
                            </h4>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
                              {step.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Marathi Chef's Notes */}
                {mr.chefNotes && (
                  <div className={`mt-8 p-5 rounded-2xl ${isDark ? 'bg-orange-400/10 border border-orange-400/20' : 'bg-orange-50 border border-orange-100'}`}>
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
                      📍 शेफची टीप
                    </p>
                    <p className={`text-sm italic leading-relaxed ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                      "{mr.chefNotes}"
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => handlePageChange('instructions')}
                    className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:-translate-x-1"
                  >
                    <FiArrowLeft size={16} /> Instructions
                  </button>
                  <button
                    onClick={() => handlePageChange('video')}
                    className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:translate-x-1"
                  >
                    Recipe Video <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ========== PAGE 05: VIDEO ========== */}
            {activePage === 'video' && (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <h2 className="font-serif text-2xl text-orange-400 italic">
                    {language === 'mr' ? 'व्हिडिओ ट्यूटोरियल' : 'Video Tutorial'}
                  </h2>
                  <span className={`label-uppercase px-3 py-1 rounded-lg border text-xs ${isDark ? 'border-dark-border text-brown-400' : 'border-cream-400 text-brown-400'}`}>
                    PAGE 05
                  </span>
                </div>
                <VideoPlayer video={recipe.video} />
                <div className="mt-8">
                  <button
                    onClick={() => handlePageChange('marathi')}
                    className="text-orange-400 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:-translate-x-1"
                  >
                    <FiArrowLeft size={16} /> मराठी Recipe
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Book Page Navigation */}
        <BookPageNav activePage={activePage} setActivePage={handlePageChange} />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 pt-8 border-t border-cream-400 dark:border-dark-border">
          <button
            onClick={handlePrint}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-colors ${isDark
                ? 'bg-brown-800 text-cream-200 hover:bg-brown-700'
                : 'bg-brown-800 text-white hover:bg-brown-700'
              }`}
            id="print-recipe-btn"
          >
            <FiPrinter size={16} />
            Print Recipe Card
          </button>
          <div className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-sm font-semibold transition-colors ${isDark
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
              <span key={i} className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${isDark
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
