import { AnimatePresence, motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import { useAIChatContext } from "../../context/AIChatContext";
import { useTheme } from "../../context/ThemeContext";
import ChatWindow from "./ChatWindow";

export default function AIChatWidget() {
  const { isOpen, toggleChat } = useAIChatContext();
  const { isDark } = useTheme();

  return (
    <>
      {/* Collapsed button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-button"
            onClick={toggleChat}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg"
            aria-label="Ask AI"
          >
            <HiSparkles size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ scale: 0.85, opacity: 0, y: 20, transformOrigin: "bottom right" }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] h-[550px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? "bg-brown-900 border-dark-border" : "bg-white border-cream-300"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark ? "bg-brown-800 border-dark-border" : "bg-cream-50 border-cream-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <HiSparkles className="text-orange-500" size={18} />
                <span className={`font-semibold text-sm ${isDark ? "text-cream-100" : "text-brown-800"}`}>
                  Recipe AI Assistant
                </span>
              </div>
              <button
                onClick={toggleChat}
                className={`p-1 rounded-full hover:bg-black/10 ${isDark ? "text-cream-300" : "text-brown-500"}`}
                aria-label="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Chat content */}
            <div className="flex-1 overflow-hidden">
              <ChatWindow />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}




