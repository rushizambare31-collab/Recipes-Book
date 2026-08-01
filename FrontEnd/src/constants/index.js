export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Recipes', path: '/recipes' },
  { name: 'Favorites', path: '/favorites' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const REGIONS = ['All', 'Western India', 'North India', 'South India', 'East India'];

export const CUISINES = ['All', 'Maharashtrian', 'Punjabi', 'South Indian', 'Gujarati', 'Bengali'];

export const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export const COOK_TIME_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under 30 min', min: 0, max: 30 },
  { label: '30–60 min', min: 30, max: 60 },
  { label: 'Over 60 min', min: 60, max: Infinity },
];

export const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Cooking Time', value: 'cookTime' },
  { label: 'Difficulty', value: 'difficulty' },
  { label: 'Name (A–Z)', value: 'name' },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: '#' },
  { name: 'Pinterest', url: '#' },
  { name: 'YouTube', url: '#' },
];

export const STATS = [
  { value: '814', suffix: '+', label: 'RECIPES CURATED' },
  { value: '4', suffix: '+', label: 'CULTURAL REGIONS' },
  { value: '8.32', suffix: '+', label: 'MONTHLY EXPLORERS' },
];

export const FAQ_DATA = [
  {
    question: 'How do I submit my own recipe for consideration?',
    answer: 'We welcome recipe submissions from passionate home cooks and professional chefs alike. Please use our Contact form with the subject "Recipe Submission" and include your recipe details, photos, and a brief story behind the dish. Our editorial team reviews all submissions within 2 weeks.'
  },
  {
    question: 'Where do you source your ingredients for test kitchens?',
    answer: 'We partner with local farmers, spice merchants, and artisan producers across India. Our test kitchen in Mumbai sources directly from Crawford Market and local organic farms to ensure the most authentic flavors in every recipe we publish.'
  },
  {
    question: 'Can I use your photos for my own blog or business?',
    answer: 'All photography on Food Finder is original and copyrighted. For licensing inquiries, please contact us through the Contact page with details about your intended use. We offer licensing options for editorial and commercial use.'
  },
  {
    question: 'Do you offer cooking classes or workshops?',
    answer: 'Yes! We periodically host virtual cooking masterclasses featuring regional cuisine experts. Subscribe to our newsletter to stay updated on upcoming workshops and exclusive culinary events.'
  },
  {
    question: 'How do I save recipes for offline access?',
    answer: 'You can save any recipe to your Favorites collection by clicking the heart icon. For offline access, use the "Print Recipe Card" button to download a beautifully formatted PDF of any recipe, complete with ingredients, instructions, and chef\'s notes.'
  },
];

export const RECIPES_PER_PAGE = 9;
