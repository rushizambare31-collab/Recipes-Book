import { motion } from 'framer-motion';
import { FiPlay, FiYoutube, FiClock, FiUser } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function VideoPlayer({ video }) {
  const { isDark } = useTheme();

  if (!video || !video.youtubeId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-3xl p-10 sm:p-14 text-center ${
          isDark ? 'bg-brown-800' : 'bg-white'
        }`}
      >
        <div className={`text-5xl mb-6 ${isDark ? 'text-brown-600' : 'text-cream-400'}`}>
          <FiPlay className="mx-auto" />
        </div>
        <h3 className={`font-serif text-2xl font-semibold mb-3 ${
          isDark ? 'text-cream-200' : 'text-brown-700'
        }`}>
          Recipe video coming soon.
        </h3>
        <p className={`text-sm ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
          We're working on bringing you a detailed video tutorial for this recipe.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Video Embed */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title="Recipe Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>

      {/* Video Info */}
      <div className={`rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDark ? 'bg-brown-800' : 'bg-white'
      }`}>
        <div className="space-y-2">
          <div className={`flex items-center gap-2 text-sm ${
            isDark ? 'text-cream-200' : 'text-brown-700'
          }`}>
            <FiUser size={14} className="text-orange-400" />
            <span className="font-medium">{video.channel}</span>
          </div>
          <div className={`flex items-center gap-2 text-xs ${
            isDark ? 'text-brown-400' : 'text-brown-500'
          }`}>
            <FiClock size={12} />
            <span>Duration: {video.duration}</span>
          </div>
        </div>

        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-500 transition-colors"
        >
          <FiYoutube size={16} />
          Watch on YouTube
        </a>
      </div>
    </motion.div>
  );
}
