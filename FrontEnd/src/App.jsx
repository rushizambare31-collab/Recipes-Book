import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
// import ChatWindow from './components/ai/ChatWindow';
import AIChatWidget from './components/ai/AIChatWidget';

function ScrollToTop() {
  const { pathname } = useLocation();

  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* <div style={{ position: 'fixed', bottom: 20, right: 20, width: 350, height: 500, background: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.2)', borderRadius: 12, overflow: 'hidden', zIndex: 9999 }}>
        <ChatWindow />
      </div> */}
       <AIChatWidget /> 

    </div>
  );
}
