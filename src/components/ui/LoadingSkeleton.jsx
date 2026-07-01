import { useTheme } from '../../context/ThemeContext';

export default function LoadingSkeleton({ count = 6 }) {
  const { isDark } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`rounded-2xl overflow-hidden ${
          isDark ? 'bg-brown-800' : 'bg-white'
        }`}>
          <div className="aspect-[4/3] animate-shimmer rounded-t-2xl" />
          <div className="p-5 sm:p-6 space-y-3.5">
            <div className={`h-3 w-20 rounded-full ${isDark ? 'animate-shimmer' : 'animate-shimmer'}`} />
            <div className={`h-5 w-3/4 rounded-full ${isDark ? 'animate-shimmer' : 'animate-shimmer'}`} />
            <div className={`h-3 w-full rounded-full ${isDark ? 'animate-shimmer' : 'animate-shimmer'}`} />
            <div className="flex items-center gap-4 pt-2">
              <div className={`h-3 w-16 rounded-full ${isDark ? 'animate-shimmer' : 'animate-shimmer'}`} />
              <div className={`h-3 w-16 rounded-full ${isDark ? 'animate-shimmer' : 'animate-shimmer'}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
