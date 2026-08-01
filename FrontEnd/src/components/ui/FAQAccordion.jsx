import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { isDark } = useTheme();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border-b transition-colors ${
            isDark ? 'border-dark-border' : 'border-cream-400'
          }`}
        >
          <button
            onClick={() => toggle(index)}
            className={`w-full flex items-center justify-between py-6 px-1 text-left transition-colors group ${
              isDark ? 'hover:text-orange-400' : 'hover:text-orange-400'
            }`}
            id={`faq-toggle-${index}`}
            aria-expanded={openIndex === index}
          >
            <span className={`font-serif text-base sm:text-lg font-medium pr-4 ${
              openIndex === index
                ? 'text-orange-400'
                : isDark ? 'text-cream-200' : 'text-brown-700'
            }`}>
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className={`flex-shrink-0 ${
                openIndex === index ? 'text-orange-400' : isDark ? 'text-brown-500' : 'text-brown-400'
              }`}
            >
              {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className={`pb-6 px-1 text-sm leading-relaxed ${
                  isDark ? 'text-brown-400' : 'text-brown-500'
                }`}>
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
