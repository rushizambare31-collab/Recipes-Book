import { createContext, useContext, useState } from "react";

const AIChatContext = createContext();

export function AIChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <AIChatContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChatContext() {
  return useContext(AIChatContext);
}