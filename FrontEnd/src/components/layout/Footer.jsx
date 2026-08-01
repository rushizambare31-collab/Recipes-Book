import { Link } from 'react-router-dom';
import { FiGlobe, FiInstagram } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import Newsletter from '../ui/Newsletter';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDark ? 'bg-brown-900 border-dark-border' : 'bg-cream-100 border-cream-400'
    }`}>
      <div className="container-editorial py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="font-serif text-2xl font-bold italic text-orange-400">
                Food Finder
              </h2>
            </Link>
            <p className={`mt-5 text-sm leading-relaxed max-w-xs ${
              isDark ? 'text-brown-400' : 'text-brown-500'
            }`}>
              Celebrating the artistry of modern Indian heritage cooking through high-end storytelling and curated recipes.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className={`p-2 rounded-full transition-colors ${
                isDark ? 'text-brown-400 hover:text-orange-400 hover:bg-brown-800' : 'text-brown-500 hover:text-orange-400 hover:bg-cream-300'
              }`} aria-label="Website">
                <FiGlobe size={18} />
              </a>
              <a href="#" className={`p-2 rounded-full transition-colors ${
                isDark ? 'text-brown-400 hover:text-orange-400 hover:bg-brown-800' : 'text-brown-500 hover:text-orange-400 hover:bg-cream-300'
              }`} aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="label-uppercase text-orange-400 mb-5">Navigation</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Developer Credits'].map(item => (
                <li key={item}>
                  <a href="#" className={`text-sm transition-colors hover:text-orange-400 ${
                    isDark ? 'text-brown-400' : 'text-brown-500'
                  }`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect + Newsletter Column */}
          <div>
            <h3 className="label-uppercase text-orange-400 mb-5">Connect</h3>
            <ul className="space-y-3 mb-8">
              {['Instagram', 'Pinterest'].map(item => (
                <li key={item}>
                  <a href="#" className={`text-sm transition-colors hover:text-orange-400 ${
                    isDark ? 'text-brown-400' : 'text-brown-500'
                  }`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <Newsletter variant="footer" />
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={`border-t py-6 ${
        isDark ? 'border-dark-border' : 'border-cream-400'
      }`}>
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-xs ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
            © {new Date().getFullYear()} Food Finder Magazine. All rights reserved.
          </p>
          <p className={`text-xs ${isDark ? 'text-brown-500' : 'text-brown-400'}`}>
            Design & Development by <span className="font-semibold text-orange-400">Rushikesh Zambare</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
