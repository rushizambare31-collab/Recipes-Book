import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiTarget, FiGlobe, FiHeart, FiCode, FiLayout, FiZap, FiSmartphone, FiDatabase } from 'react-icons/fi';

const philosophyCards = [
  { icon: <FiTarget size={24} />, title: 'Precision', description: 'Every recipe is tested four times minimum. We measure, time, and document with laboratory-level precision.' },
  { icon: <FiGlobe size={24} />, title: 'Provenance', description: 'We trace ingredients to their origins, celebrating regional traditions and the stories behind every spice.' },
  { icon: <FiHeart size={24} />, title: 'Sustainability', description: 'Our commitment to the future means seasonal cooking, minimal waste, and supporting local food artisans.' },
];

const techStack = [
  { icon: <FiCode size={20} />, name: 'React', desc: 'UI Library' },
  { icon: <FiZap size={20} />, name: 'Vite', desc: 'Build Tool' },
  { icon: <FiLayout size={20} />, name: 'Tailwind', desc: 'Styling' },
  { icon: <FiSmartphone size={20} />, name: 'Framer', desc: 'Animation' },
  { icon: <FiDatabase size={20} />, name: 'JSON Data', desc: 'Database' },
  { icon: <FiGlobe size={20} />, name: 'React Router', desc: 'Navigation' },
];

export default function AboutPage() {
  const { isDark } = useTheme();

  useEffect(() => {
    document.title = 'About — Food Finder';
  }, []);

  return (
    <div>
      {/* ========== DARK HERO ========== */}
      <section className="relative bg-brown-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&h=600&fit=crop"
            alt="Indian spices"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900 via-brown-900/70 to-brown-900/40" />
        </div>
        <div className="relative container-editorial py-28 sm:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0"
          >
            <p className="label-uppercase text-orange-400 mb-5">THE ARTISTRY</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8">
              Elevating the Art of Modern Indian Cuisine
            </h1>
            <p className="text-base sm:text-lg text-cream-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Transcending boundaries through flavor, storytelling, and the joy of authentic culinary heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== THE MUMBAI ROOTS ========== */}
      <section className="container-editorial py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="label-uppercase text-orange-400 mb-4">OUR STORY</p>
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-7 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              The Mumbai Roots
            </h2>
            <div className={`space-y-5 text-sm leading-relaxed ${
              isDark ? 'text-brown-400' : 'text-brown-500'
            }`}>
              <p>
                Food Finder was born inside the chaotic rhythm and fragrant spice stalls of Mumbai's historic markets.
                What started as a quest to document family recipes became a platform to share the world's most precious Indian gastronomy.
              </p>
              <p>
                We believe that Indian food is not a mere dish of 'curry', but a sophisticated cuisine of ancient tradition. From the coastal curries of Kerala to the tandoori specialties of Punjab, every region tells a story through its food.
              </p>
              <p>
                Our mission is to preserve these culinary narratives while making them accessible to the modern home cook, whether in Mumbai or Melbourne.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop"
              alt="Mumbai food heritage"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ========== OUR PHILOSOPHY ========== */}
      <section className={`py-20 lg:py-28 ${isDark ? 'bg-brown-800' : 'bg-cream-50'}`}>
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className={`font-serif text-3xl sm:text-4xl font-semibold ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Our Philosophy
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 sm:p-10 text-center ${
                  isDark ? 'bg-brown-900' : 'bg-white'
                }`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-400/10 text-orange-400 mb-6">
                  {card.icon}
                </div>
                <h3 className={`font-serif text-xl font-semibold mb-4 ${
                  isDark ? 'text-cream-200' : 'text-brown-800'
                }`}>
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-brown-400' : 'text-brown-500'
                }`}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CRAFTING THE DIGITAL EXPERIENCE ========== */}
      <section className="container-editorial py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-uppercase text-orange-400 mb-4">TECHNOLOGY</p>
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-5 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Crafting the Digital Experience
            </h2>
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-brown-400' : 'text-brown-500'
            }`}>
              Beyond the kitchen, Food Finder is powered by a state-of-the-art frontend architecture designed to serve every recipe enthusiast with speed, elegance, and attention to detail.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl p-5 text-center ${
                    isDark ? 'bg-brown-800' : 'bg-cream-50'
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-400/10 text-orange-400 mb-3">
                    {tech.icon}
                  </div>
                  <p className={`text-xs font-semibold ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                    {tech.name}
                  </p>
                  <p className={`text-[10px] mt-1 ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
                    {tech.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== QUOTE SECTION ========== */}
      <section className="bg-orange-400 py-20 lg:py-28">
        <div className="container-editorial max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl text-white/30 font-serif">"</span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white italic leading-snug mt-3 mb-8">
              Indian food is a sensory narrative, a journey where every spice tells a story of a thousand years.
            </blockquote>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-white/20" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Food Finder Editorial</p>
                <p className="text-xs text-white/70 mt-0.5">Culinary Philosophy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
