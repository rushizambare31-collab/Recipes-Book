import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAIChat } from "../../hooks/useAIChat";
import { useTheme } from "../../context/ThemeContext";

export default function ChatWindow() {
  const { messages, sendMessage, loading, error } = useAIChat();
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className={`text-center mt-8 text-sm ${isDark ? "text-brown-400" : "text-gray-400"}`}>
            Kuch bhi poocho — "aloo tamatar hai, kya banau?"
          </p>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-orange-500 text-white"
                  : isDark
                  ? "bg-brown-800 text-cream-100"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className={`rounded-2xl px-4 py-2 text-sm ${isDark ? "bg-brown-800 text-brown-300" : "bg-gray-100 text-gray-500"}`}>
              Soch raha hoon...
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`border-t p-3 flex gap-2 ${isDark ? "border-dark-border" : "border-gray-200"}`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apna sawaal likho..."
          className={`flex-1 border rounded-full px-4 py-2 outline-none text-sm focus:border-orange-400 ${
            isDark ? "bg-brown-800 border-dark-border text-cream-100 placeholder:text-brown-500" : "border-gray-300"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-5 py-2 rounded-full disabled:opacity-50 text-sm shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}