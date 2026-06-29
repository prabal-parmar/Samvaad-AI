import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/themeContext";
import {
  ActivityIcon,
  ArrowLeft,
  InfoIcon,
  MicIcon,
  MoonIcon,
  SendIcon,
  SunIcon,
} from "../../icons/SamvaadIcons";
import { EleganceTheme } from "../../theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import type { ChatDetails, Message } from "../../types/chatPageTypes";

export default function ChatPage(): React.JSX.Element {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  // Data from Home Page
  const chatDetails: ChatDetails = location.state;
  // message's analysis which is currently expanded
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(
    null,
  );

  const theme = isDark ? EleganceTheme.dark : EleganceTheme.light;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Welcome to your Job Interview simulation. I'll be acting as the Senior Hiring Manager. To start, could you walk me through your background and why you're interested in this role?",
      time: "10:02 AM",
    },
    {
      id: "2",
      sender: "user",
      text: "Sure. I've spent the last four years working as a software engineer, mostly focusing on frontend. I'm interested in this role because I want to transition into a position with more leadership responsibilities.",
      time: "10:03 AM",
      review: {
        score: 8.5,
        tone: "Confident",
        suggestion:
          "Good start. You clearly stated your experience, but try to briefly mention a specific achievement to make your answer more memorable.",
      },
    },
    {
      id: "4",
      sender: "ai",
      text: "That's a solid background. Can you give me an example of a time you had to lead a project or perhaps mentor a junior developer on your team?",
      time: "10:04 AM",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      review: {
        score: 7.8,
        tone: "Professional",
        suggestion:
          "Clear response. In your next reply, ensure you highlight the specific impact or result of your actions.",
      },
    };

    setMessages([...messages, newUserMsg]);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "That's an interesting approach. How did you handle the pushback from stakeholders during that process?",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen w-full h-screen w-full flex flex-col transition-colors duration-500 font-sans overflow-hidden ${theme.bg} ${theme.textMain}`}
    >
      {/* <Header /> */}
      <div
        className={`w-full flex justify-between items-center px-4 md:px-8 py-3 shrink-0 border-b-[0.5px] ${theme.border} z-20 ${theme.panel}`}
      >
        <div className="flex items-center gap-3">
          <button
            className={`p-1.5 rounded-full transition-colors hover:opacity-70 ${theme.textMuted}`}
            onClick={() => navigate("/")}
          >
            <ArrowLeft />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-base md:text-lg">
                {chatDetails.display_name}
              </h2>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-widest border-[0.5px] ${theme.border} ${theme.textMuted} hidden sm:inline-block`}
              >
                {chatDetails.level}
              </span>
            </div>
            <p
              className={`text-[10px] uppercase tracking-widest ${theme.accentText}`}
            >
              {chatDetails.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-[0.5px] text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 ${showSidebar ? theme.accentBg + " text-white border-transparent" : "bg-transparent hover:opacity-70"} ${theme.border}`}
            title="Toggle Session Analysis"
          >
            <ActivityIcon />
            <span className="hidden sm:inline-block">Live Analysis</span>
          </button>
          <button
            onClick={() => toggleTheme()}
            className={`p-2 rounded-full border-[0.5px] transition-all duration-300 ${theme.border} hover:opacity-70`}
            title="Preview Theme Toggle"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      <main className="flex-grow flex relative overflow-hidden w-full">
        {/* Left Side: Chat Interface */}
        <section
          className={`absolute left-0 top-0 h-full flex flex-col transition-all duration-300 ${showSidebar ? "w-full lg:w-[calc(100%-320px)]" : "w-full"} z-0`}
        >
          {/* Scrollable Messages Area */}
          <div className="flex-grow overflow-y-auto px-4 md:px-10 pt-8 pb-32 space-y-6">
            <div
              className={`text-center text-xs tracking-widest uppercase mb-8 ${theme.textMuted}`}
            >
              Chat Started
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "coach" ? (
                  <div
                    className={`max-w-[90%] md:max-w-[75%] p-4 rounded-xl border-[0.5px] flex gap-3 shadow-sm ${theme.accentSubtle}`}
                  >
                    <div className={`mt-0.5 shrink-0 ${theme.accentText}`}>
                      <InfoIcon />
                    </div>
                    <div>
                      <span
                        className={`block text-[10px] uppercase tracking-widest mb-1 font-bold ${theme.accentText}`}
                      >
                        Live Suggestion
                      </span>
                      <p
                        className={`text-sm leading-relaxed ${theme.textMain}`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} max-w-[85%] md:max-w-[70%]`}
                  >
                    <div
                      className={`p-5 rounded-2xl shadow-sm border-[0.5px] ${
                        msg.sender === "user"
                          ? `${theme.userBubble} ${theme.userBubbleText} rounded-br-sm border-transparent`
                          : `${theme.aiBubble} ${theme.textMain} ${theme.border} rounded-bl-sm`
                      }`}
                    >
                      <p className="leading-relaxed font-light text-[15px]">
                        {msg.text}
                      </p>

                      <div className="flex justify-between items-center mt-3 gap-4">
                        <span
                          className={`block text-[10px] ${msg.sender === "user" ? "opacity-70" : theme.textMuted}`}
                        >
                          {msg.time}
                        </span>

                        {/* Clickable Score Indicator for User Messages */}
                        {msg.sender === "user" && msg.review && (
                          <button
                            onClick={() =>
                              setExpandedMessageId(
                                expandedMessageId === msg.id ? null : msg.id,
                              )
                            }
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all text-[10px] font-medium tracking-wide active:scale-95"
                            title="View Message Analysis"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            {msg.review.score}/10
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.sender === "user" &&
                      msg.review &&
                      expandedMessageId === msg.id && (
                        <div
                          className={`mt-2 w-[95%] p-4 rounded-xl border-[0.5px] shadow-sm flex flex-col gap-2 ${theme.panel} ${theme.border} animate-in fade-in slide-in-from-top-1`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span
                              className={`text-[9px] uppercase tracking-widest font-bold ${theme.accentText}`}
                            >
                              Message Analysis
                            </span>
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded-full border-[0.5px] ${theme.border} ${theme.textMuted}`}
                            >
                              {msg.review.tone}
                            </span>
                          </div>
                          <p
                            className={`text-xs font-light leading-relaxed ${theme.textMain}`}
                          >
                            {msg.review.suggestion}
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div
            className={`absolute bottom-0 w-full px-4 md:px-10 pb-6 pt-10 bg-gradient-to-t ${isDark ? "from-[#0D1117] via-[#0D1117]" : "from-[#FAFAFA] via-[#FAFAFA]"} to-transparent`}
          >
            <form
              onSubmit={handleSendMessage}
              className={`flex items-end gap-3 p-2 rounded-2xl border-[0.5px] ${theme.panel} ${theme.border} shadow-lg`}
            >
              <button
                type="button"
                className={`p-3 shrink-0 rounded-full transition-opacity hover:opacity-70 ${theme.textMuted}`}
                title="Voice Input (Phase 3)"
              >
                <MicIcon />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your response..."
                className={`flex-grow bg-transparent outline-none h-12 text-[15px] font-light placeholder-opacity-50 ${theme.textMain}`}
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-3 shrink-0 rounded-full text-white transition-all duration-300 ${inputText.trim() ? `${theme.accentBg} hover:opacity-90 shadow-md transform active:scale-95` : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"}`}
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </section>

        <aside
          className={`absolute top-0 right-0 h-full w-full lg:w-[320px] border-l-[0.5px] ${theme.border} ${theme.sidebarBg} transform transition-transform duration-300 ${showSidebar ? "translate-x-0 shadow-2xl lg:shadow-none" : "translate-x-full"} z-10 overflow-y-auto`}
        >
          <div className="p-6">
            <div className="mb-8 flex justify-between items-start">
              <div>
                <span
                  className={`block text-[9px] uppercase tracking-widest mb-1 ${theme.accentText}`}
                >
                  Analysis Engine
                </span>
                <h2 className="font-serif text-lg">Real-Time Metrics</h2>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className={`lg:hidden p-1 opacity-50 hover:opacity-100 ${theme.textMain}`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="uppercase text-[11px] font-bold tracking-widest opacity-80">
                    Clarity Score
                  </span>
                  <span className="font-serif text-xl">
                    8.5
                    <span className={`text-sm font-sans ${theme.textMuted}`}>
                      /10
                    </span>
                  </span>
                </div>
                <div
                  className={`h-[3px] w-full ${isDark ? "bg-[#30363D]" : "bg-gray-200"} rounded-full overflow-hidden`}
                >
                  <div
                    className={`h-full w-[85%] ${theme.accentBg} rounded-full transition-all duration-1000`}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="uppercase text-[11px] font-bold tracking-widest opacity-80">
                    Confidence
                  </span>
                  <span className="font-serif text-xl">
                    7.2
                    <span className={`text-sm font-sans ${theme.textMuted}`}>
                      /10
                    </span>
                  </span>
                </div>
                <div
                  className={`h-[3px] w-full ${isDark ? "bg-[#30363D]" : "bg-gray-200"} rounded-full overflow-hidden`}
                >
                  <div
                    className={`h-full w-[72%] ${theme.accentBg} rounded-full transition-all duration-1000`}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="uppercase text-[11px] font-bold tracking-widest opacity-80">
                    Engagement
                  </span>
                  <span className="font-serif text-xl">
                    9.0
                    <span className={`text-sm font-sans ${theme.textMuted}`}>
                      /10
                    </span>
                  </span>
                </div>
                <div
                  className={`h-[3px] w-full ${isDark ? "bg-[#30363D]" : "bg-gray-200"} rounded-full overflow-hidden`}
                >
                  <div
                    className={`h-full w-[90%] ${theme.accentBg} rounded-full transition-all duration-1000`}
                  ></div>
                </div>
              </div>

              <div className={`pt-8 border-t-[0.5px] ${theme.border}`}></div>

              <div>
                <span className="block uppercase text-[11px] font-bold tracking-widest mb-4 opacity-80">
                  Detected Emotion / Tone
                </span>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium border-[0.5px] ${theme.border} ${theme.panel}`}
                  >
                    Professional
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium border-[0.5px] ${theme.accentSubtle} ${theme.accentText}`}
                  >
                    Slightly Nervous
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium border-[0.5px] ${theme.border} ${theme.panel}`}
                  >
                    Polite
                  </span>
                </div>
                <p className={`text-[11px] mt-4 font-light ${theme.textMuted}`}>
                  AI perceives slight hesitation in your last response. Maintain
                  steady pacing.
                </p>
              </div>

              <div className={`pt-8 border-t-[0.5px] ${theme.border}`}></div>

              <button
                className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase font-bold rounded-xl border-[0.5px] transition-colors duration-300 hover:bg-red-500 hover:text-white hover:border-transparent ${theme.border} ${theme.textMain}`}
              >
                End Session & Review
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
