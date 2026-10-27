"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Loader2, Sparkles } from "lucide-react";
import { useChatStore } from "@/lib/store/useChatStore";

export default function ChatWidget() {
  const {
    isOpen,
    toggleChat,
    messages,
    isLoading,
    error,
    remaining,
    hasStartedSession,
    startSession,
    sendMessage,
  } = useChatStore();

  const [showLeadForm, setShowLeadForm] = useState(true);
  const [showLargeModal, setShowLargeModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (hasStartedSession) {
      setShowLeadForm(false);
    }
  }, [hasStartedSession]);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    await startSession(name.trim(), email.trim(), subject.trim() || undefined);
    setShowLeadForm(false);
    setShowLargeModal(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || remaining <= 0) return;

    const message = inputMessage.trim();
    setInputMessage("");
    await sendMessage(message);
  };

  const handleFloatingButtonClick = () => {
    if (hasStartedSession) {
      setShowLargeModal(true);
    } else {
      toggleChat();
    }
  };

  const handleCloseLargeModal = () => {
    setShowLargeModal(false);
  };

  return (
    <>
      {/* Floating Cyber Trigger Button */}
      <motion.button
        onClick={handleFloatingButtonClick}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#0a0d18] border border-[#00f0ff] text-[#00f0ff] font-mono text-xs font-bold tracking-wider hover:bg-[#00f0ff] hover:text-black transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle OBIN AI terminal"
      >
        <span className="w-2 h-2 rounded-full bg-[#00ff9f] animate-pulse" />
        <Terminal className="h-4 w-4" />
        <span className="hidden sm:inline">[AI: OBIN]</span>
      </motion.button>

      {/* Small Popup (Lead Form) */}
      <AnimatePresence>
        {isOpen && !hasStartedSession && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', zIndex: 9999 }}
            className="!fixed bottom-20 right-4 sm:bottom-24 sm:right-7 z-[9999] flex h-[70vh] max-h-[500px] min-h-[400px] w-[92vw] max-w-[23rem] flex-col overflow-hidden border border-[#00f0ff]/40 bg-[#07080f]/95 shadow-[0_0_35px_rgba(0,240,255,0.25)] font-mono hud-corner-tl hud-corner-br backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0c0f1d] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">
                  [AUTH_HANDSHAKE]
                </span>
              </div>
              <button
                onClick={toggleChat}
                className="w-6 h-6 flex items-center justify-center border border-zinc-800 hover:border-[#ff007f] text-zinc-400 hover:text-[#ff007f] transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Lead Form */}
            <form
              onSubmit={handleStartSession}
              className="flex flex-1 flex-col justify-between p-5 text-left"
            >
              <div>
                <div className="mb-4 pb-3 border-b border-zinc-800">
                  <div className="text-[10px] text-[#00f0ff] uppercase tracking-widest font-bold">
                    INITIALIZE SECURE SESSION
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    OBIN AI ASSISTANT
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Connect to portfolio knowledge graph & ask anything.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="NAME *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    required
                    className="w-full bg-[#0a0d18] border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a0d18] border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff] transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="SUBJECT (OPTIONAL)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    maxLength={120}
                    className="w-full bg-[#0a0d18] border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff] transition-colors"
                  />
                </div>

                {error && (
                  <p className="mt-2 text-center text-xs text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim() || !email.trim()}
                className="w-full cyber-button disabled:cursor-not-allowed disabled:opacity-50 mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    CONNECTING...
                  </span>
                ) : (
                  "ESTABLISH LINK ->"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Centered Modal (Chat Terminal) */}
      <AnimatePresence>
        {showLargeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6" style={{ position: 'fixed' }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={handleCloseLargeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex h-[86vh] w-full max-w-4xl flex-col overflow-hidden border border-[#00f0ff]/40 bg-[#07080f] shadow-[0_0_50px_rgba(0,240,255,0.3)] font-mono hud-corner-tl hud-corner-br"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0a0d18] px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff9f] animate-pulse" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
                      <span>OBIN_AI_TERMINAL // v2.6</span>
                      <span className="text-[10px] text-[#ff007f] font-normal">[LIVE]</span>
                    </h3>
                    <p className="text-[10px] text-zinc-400 tracking-wider">
                      AGENTIC MODEL: OPENAI SDK // PROTOCOL: FAILOVER
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-[11px] text-[#00f0ff] bg-black/60 px-3 py-1 border border-[#00f0ff]/30">
                    QUERIES: <strong className="text-white">{remaining}</strong> REMAINING
                  </div>
                  <button
                    onClick={handleCloseLargeModal}
                    className="w-7 h-7 flex items-center justify-center border border-zinc-800 hover:border-[#ff007f] text-zinc-400 hover:text-[#ff007f] transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 bg-[#05060b]">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-6 text-center py-10">
                    <div className="w-12 h-12 border border-[#00f0ff]/40 flex items-center justify-center bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                        [OBIN INITIALIZED // READY FOR PROMPTS]
                      </h4>
                      <p className="text-xs text-zinc-400 max-w-md">
                        Ask about Osama&apos;s agentic AI projects, professional certifications, tech stack, or career milestones.
                      </p>
                    </div>

                    <div className="grid w-full max-w-[620px] grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                      {[
                        "Who is Osama bin Adnan?",
                        "What certifications has Osama earned?",
                        "Show projects with live URLs.",
                        "What is Osama's core tech stack?",
                      ].map((q) => (
                        <button
                          key={q}
                          type="button"
                          disabled={isLoading || remaining <= 0}
                          onClick={() => sendMessage(q)}
                          className="border border-zinc-800 bg-[#0c0e1a] p-3 text-xs text-zinc-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all text-left flex items-center justify-between"
                        >
                          <span>&gt; {q}</span>
                          <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "border border-[#00f0ff]/40 bg-[#0a1424] text-white shadow-[0_0_20px_rgba(0,240,255,0.15)] border-r-2 border-r-[#00f0ff]"
                          : "border border-zinc-800 bg-[#0b0e1b] text-zinc-200"
                      }`}
                    >
                      <div
                        className={`text-[10px] mb-1.5 tracking-widest uppercase font-mono font-bold flex items-center gap-1.5 ${
                          msg.role === "user" ? "text-[#00f0ff]" : "text-zinc-400"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
                            <span>[USER_TRANSMISSION]</span>
                          </>
                        ) : (
                          "[OBIN_CORE_RESPONSE]"
                        )}
                      </div>
                      <p
                        className={`whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "text-zinc-100 text-xs sm:text-sm font-mono font-medium"
                            : "text-zinc-200"
                        }`}
                      >
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 border border-[#00f0ff]/30 bg-[#0b0e1b] px-4 py-3 text-xs text-[#00f0ff]">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>&gt; INFERRING FROM KNOWLEDGE GRAPH...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                    [ERROR]: {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-zinc-800 bg-[#07080f] p-4"
              >
                {remaining <= 0 ? (
                  <div className="bg-[#0b0e1b] border border-zinc-800 p-3 text-center text-xs text-zinc-400">
                    [QUOTA_EXHAUSTED]: Daily question quota reached for this session.
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER PROMPT COMMAND..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      maxLength={2000}
                      disabled={isLoading || remaining <= 0}
                      className="flex-1 bg-[#0b0e1b] border border-zinc-800 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff] transition-colors font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputMessage.trim() || remaining <= 0}
                      className="cyber-button px-5 py-3"
                      aria-label="Send prompt"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
