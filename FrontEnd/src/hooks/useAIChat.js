import { useState, useEffect, useCallback } from "react";
import { getDeviceId } from "../utils/deviceId";

const API_URL = import.meta.env.VITE_API_URL;

export function useAIChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deviceId = getDeviceId();

  // Page load hote hi purani history load karo
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch(`${API_URL}/api/chat/history/${deviceId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("History load failed:", err);
      }
    }
    loadHistory();
  }, [deviceId]);

  // Naya message bhejne ka function
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    setError(null);

    // Optimistic update — user ka message turant UI mein dikha do (AI ka wait kiye bina)
    const userMessage = { role: "user", content: text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, message: text }),
      });

      const data = await res.json();

      if (data.success) {
        const aiMessage = { role: "assistant", content: data.reply, timestamp: new Date().toISOString() };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setError(data.error || "Kuch galat ho gaya");
      }
    } catch (err) {
      setError("Server se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  return { messages, sendMessage, loading, error };
}