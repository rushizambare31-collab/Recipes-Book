import { useState, useEffect, useCallback } from "react";
import { getDeviceId } from "../utils/deviceId";

const API_URL = import.meta.env.VITE_API_URL;

export function useAIChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(true);

  const deviceId = getDeviceId();

  useEffect(() => {
    async function loadHistory() {
      setHistoryLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/chat/history/${deviceId}`);
        if (!res.ok) throw new Error("History load failed");
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("History load failed:", err);
        // Chup chaap fail hone dete hain — user ko empty chat dikhega, error nahi
        // (kyunki ye "background" load hai, user ne khud request nahi ki)
      } finally {
        setHistoryLoading(false);
      }
    }
    loadHistory();
  }, [deviceId]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    setError(null);

    const userMessage = { role: "user", content: text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, message: text }),
      });

      if (!res.ok) {
        throw new Error(res.status === 500 ? "Server mein kuch problem hai" : "Request fail ho gayi");
      }

      const data = await res.json();

      if (data.success) {
        const aiMessage = { role: "assistant", content: data.reply, timestamp: new Date().toISOString() };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setError(data.error || "Kuch galat ho gaya, dobara try karo");
      }
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Backend se connect nahi ho pa raha — server chal raha hai check karo");
      } else {
        setError(err.message || "Kuch galat ho gaya");
      }
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  return { messages, sendMessage, loading, error, historyLoading };
}