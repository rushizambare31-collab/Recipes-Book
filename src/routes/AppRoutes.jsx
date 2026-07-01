import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const HomePage = lazy(() => import('../pages/HomePage'));
const RecipesPage = lazy(() => import('../pages/RecipesPage'));
const RecipeDetailPage = lazy(() => import('../pages/RecipeDetailPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <LoadingSkeleton count={3} />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
