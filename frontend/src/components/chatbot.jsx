import { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  X,
  MapPin,
  Camera,
  Info,
  Star,
  Compass,
  Mountain,
} from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Namaste! 🇮🇳 Welcome to your India Travel Guide! I'm here to help you explore the incredible diversity of India - from the majestic Himalayas to pristine beaches, ancient temples to modern cities. Ask me about destinations, festivals, cuisine, or travel tips for the incredible journey ahead!",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Groq API configuration
  const GROQ_API_KEY = import.meta.env.VITE_XAI_API_KEY;
  const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const callGroqAPI = async (userMessage) => {
    const systemPrompt = `You are an expert India travel assistant with deep knowledge of Indian culture, destinations, cuisine, festivals, and travel logistics. You provide detailed, accurate, and enthusiastic information about traveling within India, including hidden gems, cultural insights, local customs, regional specialties, transportation options, and practical travel tips. Always maintain a warm, welcoming tone that reflects Indian hospitality. Include relevant cultural context and insider tips. If you don't know something specific, be honest and suggest reliable local resources or official tourism boards.`;

    const conversationHistory = messages.slice(-5).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const requestBody = {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      stream: false,
    };

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Groq API Error:", error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!GROQ_API_KEY) {
      alert(
        "Please set your GROQ API key in the environment variables (VITE_GROQ_API_KEY)"
      );
      return;
    }

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await callGroqAPI(currentInput);

      const botReply = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or check if your API key is configured correctly.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const quickActions = [
    {
      icon: <Star className="w-4 h-4" />,
      text: "Golden Triangle",
      action: () => setInput("Tell me about the Golden Triangle tour in India"),
    },
    {
      icon: <Mountain className="w-4 h-4" />,
      text: "Hill Stations",
      action: () =>
        setInput("What are the best hill stations in India for summer?"),
    },
    {
      icon: <Camera className="w-4 h-4" />,
      text: "Best Photo Spots",
      action: () =>
        setInput("Where are the most Instagram-worthy places in India?"),
    },
    {
      icon: <Info className="w-4 h-4" />,
      text: "Cultural Tips",
      action: () =>
        setInput("What cultural etiquette should I know when visiting India?"),
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open ? (
        <div className="w-full max-w-sm sm:max-w-md h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-orange-200 animate-in slide-in-from-bottom-4 duration-500 relative">
          {/* Decorative Pattern Background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ff6b35'%3E%3Cpath d='M30 0l15 15-15 15-15-15z' opacity='0.5'/%3E%3Cpath d='M30 30l15 15-15 15-15-15z' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Enhanced Header with Indian Theme */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-5 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20 animate-pulse"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <circle cx="12" cy="8" r="2" />
                  <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">India Travel Guide</h3>
                <p className="text-sm text-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {GROQ_API_KEY ? "Ready to explore India!" : "API key missing"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 relative z-10 group"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* Enhanced Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-orange-50/30 via-red-50/20 to-pink-50/30 relative">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-br-md border border-orange-600 shadow-lg"
                      : "bg-white/90 text-gray-800 rounded-bl-md shadow-md border border-gray-200 backdrop-blur-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      message.role === "user"
                        ? "text-orange-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <div className="bg-white/90 p-4 rounded-2xl rounded-bl-md shadow-md border border-gray-200 backdrop-blur-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      India Guide is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-orange-200 bg-gradient-to-r from-orange-50/50 to-red-50/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-500" />
                Quick Explore:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.action}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 rounded-xl text-sm text-orange-800 transition-all duration-200 group border border-orange-200 hover:border-orange-300 transform hover:scale-105"
                    aria-label={action.text}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {action.icon}
                    </span>
                    <span className="font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input Area */}
          <div className="p-4 border-t border-orange-200 bg-gradient-to-r from-orange-50/50 to-red-50/50 backdrop-blur-sm">
            <div className="flex items-end space-x-3">
              <div className="flex-1 min-h-[48px] max-h-[120px] bg-white/80 rounded-2xl flex items-center px-4 border border-orange-200 shadow-sm backdrop-blur-sm">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    GROQ_API_KEY
                      ? "Ask about India's wonders..."
                      : "Set API key first..."
                  }
                  className="w-full bg-transparent border-none outline-none resize-none text-sm py-3 max-h-[80px] placeholder-gray-500"
                  rows={1}
                  aria-label="Type your India travel question"
                  disabled={!GROQ_API_KEY}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping || !GROQ_API_KEY}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-18 h-18 bg-gradient-to-br text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden transform "
          aria-label="Open India travel guide chat"
        >
          {/* Animated background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/50 via-red-400/50 to-pink-400/50 rounded-full animate-spin opacity-20"></div>

          {/* Multiple ring animations */}
          <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></div>
          <div
            className="absolute inset-0 rounded-full border-2 border-orange-300/60 animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* India-themed icon */}
          <div className="relative z-10 flex items-center justify-center">
            <img
              src="/images/ch.png"
              alt="Heritage Icon"
              className=" group-hover:scale-110 transition-transform duration-300 bg-cover"
            />
          </div>

          {/* Enhanced notification indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-xs text-white font-bold">🇮🇳</span>
          </div>

          {/* Rotating glow effect */}
        </button>
      )}
    </div>
  );
};

export default ChatBot;
