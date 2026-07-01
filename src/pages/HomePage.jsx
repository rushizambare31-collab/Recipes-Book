import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../hooks/useRecipes';
import { STATS } from '../constants';
import RegionCards from '../components/recipe/RegionCards';
import RecipeGrid from '../components/recipe/RecipeGrid';
import TrendingRecipes from '../components/recipe/TrendingRecipes';

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(value);
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const display = value.includes('.') ? count.toFixed(2) : Math.floor(count);

  return (
    <span ref={ref} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
      {display}{suffix}
    </span>
  );
}

export default function HomePage() {
  const { isDark } = useTheme();
  const { allRecipes, trendingRecipes } = useRecipes();
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const navigate = useNavigate();

  const filteredByRegion = useMemo(() => {
    if (selectedCuisine === 'All') return allRecipes.slice(0, 6);
    return allRecipes.filter(r => r.cuisine === selectedCuisine).slice(0, 6);
  }, [allRecipes, selectedCuisine]);

  const heroRecipe = allRecipes.find(r => r.featured) || allRecipes[0];

  const handleSurpriseMe = () => {
    const random = allRecipes[Math.floor(Math.random() * allRecipes.length)];
    navigate(`/recipes/${random.slug}`);
  };

  useEffect(() => {
    document.title = 'Food Finder — Premium Indian Recipe Discovery';
  }, []);

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <section className="container-editorial pt-12 sm:pt-16 lg:pt-20 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="label-uppercase text-orange-400 mb-5">
              GOURMET INDIAN EXPERIENCE
            </p>
            <h1 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Find Delicious{' '}
              <span className="block">Recipes From</span>
              <span className="block">Across India</span>
            </h1>
            <p className={`text-base sm:text-lg leading-relaxed mb-10 max-w-lg ${
              isDark ? 'text-brown-400' : 'text-brown-500'
            }`}>
              Discover authentic recipes from Maharashtrian, Punjabi, South Indian, Gujarati and Bengali cuisines. Curated for the modern epicurean.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/recipes"
                className="inline-flex items-center px-7 py-3.5 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors shadow-sm"
                id="hero-explore-btn"
              >
                EXPLORE RECIPES
              </Link>
              <button
                onClick={handleSurpriseMe}
                className={`inline-flex items-center px-7 py-3.5 text-sm font-semibold rounded-full border transition-colors ${
                  isDark
                    ? 'border-dark-border text-cream-200 hover:border-orange-400 hover:text-orange-400'
                    : 'border-brown-300 text-brown-700 hover:border-orange-400 hover:text-orange-400'
                }`}
                id="hero-surprise-btn"
              >
                SURPRISE ME
              </button>
            </div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
              <img
                src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&h=600&fit=crop"
                alt="Delicious Indian cuisine"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`absolute -bottom-5 -left-4 sm:left-auto sm:-right-4 rounded-2xl p-5 shadow-xl ${
                isDark ? 'bg-brown-800' : 'bg-white'
              }`}
            >
              <p className="label-uppercase text-orange-400 mb-1.5">Featured</p>
              <p className={`font-serif text-sm font-semibold ${isDark ? 'text-cream-200' : 'text-brown-800'}`}>
                {heroRecipe?.name}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
                {heroRecipe?.cuisine} • {heroRecipe?.cookTime}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== EXPLORE BY REGION ========== */}
      <section className={`py-20 lg:py-28 ${isDark ? 'bg-brown-900' : 'bg-cream-50'}`}>
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className={`font-serif text-3xl sm:text-4xl font-semibold mb-10 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Explore by Region
            </h2>
            <RegionCards selected={selectedCuisine} onSelect={setSelectedCuisine} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <RecipeGrid recipes={filteredByRegion} />
          </motion.div>
        </div>
      </section>

      {/* ========== TRENDING RECIPES ========== */}
      {trendingRecipes.length > 0 && (
        <section className="container-editorial py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="label-uppercase text-orange-400 mb-4">WHAT'S HOT</p>
            <h2 className={`font-serif text-3xl sm:text-4xl font-semibold ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Trending Recipes
            </h2>
          </motion.div>
          <TrendingRecipes recipes={trendingRecipes.slice(0, 6)} />
        </section>
      )}

      {/* ========== STATS SECTION ========== */}
      <section className={`py-20 lg:py-24 ${isDark ? 'bg-brown-800' : 'bg-cream-200'}`}>
        <div className="container-editorial max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={isDark ? 'text-cream-200' : 'text-brown-800'}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className={`label-uppercase mt-3 ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="container-editorial py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`rounded-3xl p-10 sm:p-14 lg:p-20 text-center ${
            isDark ? 'bg-brown-800' : 'bg-cream-200'
          }`}
        >
          <p className="label-uppercase text-orange-400 mb-4">START YOUR JOURNEY</p>
          <h2 className={`font-serif text-3xl sm:text-4xl font-semibold mb-5 ${
            isDark ? 'text-cream-200' : 'text-brown-800'
          }`}>
            Ready to Discover?
          </h2>
          <p className={`text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed ${
            isDark ? 'text-brown-400' : 'text-brown-500'
          }`}>
            Explore our curated collection of authentic Indian recipes, save your favorites, and print beautiful cookbook-style recipe cards.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center px-8 py-3.5 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors shadow-md"
            id="cta-explore-btn"
          >
            Browse All Recipes
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
