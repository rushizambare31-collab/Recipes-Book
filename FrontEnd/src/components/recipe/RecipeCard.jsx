import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import FavoriteButton from '../ui/FavoriteButton';

const PLACEHOLDER_IMAGES = {
  'misal-pav': 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=600&h=450&fit=crop',
  'vada-pav': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=450&fit=crop',
  'puran-poli': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=450&fit=crop',
  'modak': 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=450&fit=crop',
  'thalipeeth': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=450&fit=crop',
  'sabudana-khichdi': 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&h=450&fit=crop',
  'bharli-vangi': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=450&fit=crop',
  'kothimbir-vadi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=450&fit=crop',
  'zunka-bhakar': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=450&fit=crop',
  'chole-bhature': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&h=450&fit=crop',
  'dal-makhani': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'paneer-butter-masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=450&fit=crop',
  'sarson-ka-saag': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=450&fit=crop',
  'amritsari-kulcha': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=450&fit=crop',
  'crispy-ghee-dosa': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=450&fit=crop',
  'soft-idli': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=450&fit=crop',
  'medu-vada': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=450&fit=crop',
  'uttapam': 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=450&fit=crop',
  'sambar': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop',
  'dhokla': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=450&fit=crop',
  'khandvi': 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=450&fit=crop',
  'thepla': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=450&fit=crop',
  'handvo': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=450&fit=crop',
  'rasgulla': 'https://images.unsplash.com/photo-1666190094762-2f24a1f7e5b4?w=600&h=450&fit=crop',
  'sandesh': 'https://images.unsplash.com/photo-1666190094762-2f24a1f7e5b4?w=600&h=450&fit=crop',
  'macher-jhol': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=450&fit=crop',
  'mishti-doi': 'https://images.unsplash.com/photo-1666190094762-2f24a1f7e5b4?w=600&h=450&fit=crop',
};

export function getRecipeImage(slug) {
  return PLACEHOLDER_IMAGES[slug] || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop`;
}

export default function RecipeCard({ recipe, index = 0 }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/recipes/${recipe.slug}`} className="block" id={`recipe-card-${recipe.slug}`}>
        <div className={`rounded-2xl overflow-hidden transition-shadow duration-300 ${
          isDark
            ? 'bg-brown-800 hover:shadow-xl hover:shadow-black/20'
            : 'bg-white hover:shadow-xl hover:shadow-brown-200/60'
        }`}>
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Cuisine Badge */}
            <span className="absolute bottom-4 left-4 px-3 py-1 bg-orange-400 text-white text-[10px] font-semibold uppercase tracking-wider rounded-md">
              {recipe.cuisine}
            </span>
            {/* Favorite Button */}
            <div className="absolute top-4 right-4">
              <FavoriteButton recipeId={recipe.id} size={16} />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            <h3 className={`font-serif text-lg font-semibold mb-2 transition-colors group-hover:text-orange-400 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              {recipe.name}
            </h3>
            <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
              isDark ? 'text-brown-400' : 'text-brown-500'
            }`}>
              {recipe.description}
            </p>
            <div className={`flex items-center gap-4 text-xs pt-4 border-t ${
              isDark ? 'text-brown-500 border-dark-border' : 'text-brown-400 border-cream-400'
            }`}>
              <span className="flex items-center gap-1">
                <FiClock size={12} />
                {recipe.cookTime}
              </span>
              <span>•</span>
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
