import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiShare2, FiStar, FiGlobe, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import FAQAccordion from '../components/ui/FAQAccordion';
import { FAQ_DATA } from '../constants';

const SUBJECTS = ['Recipe Sourcing', 'Press Inquiry', 'Collaboration', 'General Question', 'Bug Report'];

export default function ContactPage() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: SUBJECTS[0], message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact — Food Finder';
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: SUBJECTS[0], message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const inputClass = (field) => `w-full px-4 py-3.5 rounded-xl text-sm border outline-none transition-colors ${
    errors[field] ? 'border-red-400' : isDark
      ? 'bg-brown-800 border-dark-border text-cream-200 placeholder:text-brown-500 focus:border-orange-400'
      : 'bg-cream-50 border-cream-400 text-brown-700 placeholder:text-brown-400 focus:border-orange-400'
  }`;

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="container-editorial pt-12 sm:pt-16 lg:pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="label-uppercase text-orange-400 mb-4">SAFFRON & SILK COLLECTIVE</p>
            <h1 className={`font-serif text-4xl sm:text-5xl font-bold leading-[1.08] mb-6 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Get in Touch
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed max-w-md ${
              isDark ? 'text-brown-400' : 'text-brown-500'
            }`}>
              Whether you're looking to contribute a family recipe or have a press inquiry, our team is here to listen and collaborate.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
              alt="Cooking spices"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT FORM + INFO ========== */}
      <section className="container-editorial pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Form - 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-3 rounded-3xl p-7 sm:p-9 ${
              isDark ? 'bg-brown-800' : 'bg-white'
            }`}
          >
            <h2 className={`font-serif text-2xl font-semibold mb-8 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-8 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-uppercase text-brown-400 mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder="John Sharma"
                    className={inputClass('name')}
                    id="contact-name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="label-uppercase text-brown-400 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="john@example.com"
                    className={inputClass('email')}
                    id="contact-email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="label-uppercase text-brown-400 mb-2 block">Subject</label>
                <select
                  value={formData.subject}
                  onChange={handleChange('subject')}
                  className={inputClass('subject')}
                  id="contact-subject"
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="label-uppercase text-brown-400 mb-2 block">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={handleChange('message')}
                  placeholder="How can we help you?"
                  rows={5}
                  className={inputClass('message')}
                  id="contact-message"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-400 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                id="contact-submit"
              >
                Send Message <FiSend size={14} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info - 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-2 rounded-3xl p-7 sm:p-9 ${
              isDark ? 'bg-brown-800' : 'bg-white'
            }`}
          >
            <h2 className={`font-serif text-2xl font-semibold mb-8 ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Contact Information
            </h2>

            <div className="space-y-7">
              {[
                { icon: <FiMapPin className="text-orange-400" size={18} />, label: 'Mumbai Studio', detail: '402, Editorial Plaza, Worli Seaface, Mumbai, MH 400018' },
                { icon: <FiMail className="text-orange-400" size={18} />, label: 'General Inquiries', detail: 'rushizambare31@gmail.com' },
                { icon: <FiPhone className="text-orange-400" size={18} />, label: 'Editorial Desk', detail: '+91 9172293319' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-cream-200' : 'text-brown-700'}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-brown-400' : 'text-brown-500'}`}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10">
              <p className="label-uppercase text-brown-400 mb-4">CONNECT WITH US</p>
              <div className="flex gap-3">
                {[FiShare2, FiStar, FiGlobe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isDark
                        ? 'bg-brown-900 text-brown-400 hover:text-orange-400 hover:bg-orange-400/10'
                        : 'bg-cream-50 text-brown-400 hover:text-orange-400 hover:bg-orange-50'
                    }`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map Card */}
            <div className={`mt-10 rounded-2xl overflow-hidden h-36 relative ${
              isDark ? 'bg-brown-900' : 'bg-cream-200'
            }`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin size={24} className="mx-auto text-orange-400 mb-2" />
                  <p className="label-uppercase text-brown-400">VIEW ON MAP</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className={`py-20 lg:py-28 ${isDark ? 'bg-brown-800' : 'bg-cream-50'}`}>
        <div className="container-editorial max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`font-serif text-3xl sm:text-4xl font-semibold ${
              isDark ? 'text-cream-200' : 'text-brown-800'
            }`}>
              Frequently Asked Questions
            </h2>
          </motion.div>
          <FAQAccordion items={FAQ_DATA} />
        </div>
      </section>
    </div>
  );
}
