"use client";

import { useChat } from "ai/react";
import { useState, useEffect, useRef } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";

/**
 * ChatAssistant - AI-Powered FAQ Section
 * Replaces traditional FAQ accordion with interactive chatbot using RAG architecture.
 * Persists conversation across page navigation using localStorage.
 */
export default function ChatAssistant() {

    // hydrated: prevents SSR mismatch by waiting for client mount before reading localStorage
    const [hydrated, setHydrated] = useState(false);

    // Vercel AI SDK hook - handles all chat logic
    // messages: array of chat messages [{role: 'user', content: '...'}, ...]
    // input: current text in input box
    // handleInputChange: updates input as user types
    // handleSubmit: sends message to /api/chat
    // isLoading: true when AI is generating response
    // setMessages: updates messages array (for persistence)
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        setMessages,
    } = useChat({
        api: "/api/chat",
    });

    // Load saved conversation from localStorage on mount (gated behind hydrated to fix SSR mismatch)
    useEffect(() => {
        const savedMessages = localStorage.getItem('seva-chat-messages');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                setMessages(parsed);
            } catch (e) {
                console.error('Failed to load chat history:', e);
            }
        }
        setHydrated(true);
    }, [setMessages]);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (!hydrated) return; // Don't save until after we've loaded
        if (messages.length > 0) {
            localStorage.setItem('seva-chat-messages', JSON.stringify(messages));
        }
    }, [messages, hydrated]);

    // Suggested starter questions (shown when conversation is empty)
    const suggestions = [
        "How do I become a member? 🙋",
        "What events are coming up? 📅",
        "What are the member benefits? ✨",
        "How do I contact Seva? 📧",
    ];

    // Handle clicking a suggestion: put text in input and auto-submit
    const handleSuggestionClick = (suggestion: string) => {
        const fakeEvent = {
            preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>;

        handleInputChange({
            target: { value: suggestion }
        } as any);

        setTimeout(() => handleSubmit(fakeEvent), 0);
    };

    // Clear conversation and localStorage
    const handleClearChat = () => {
        setMessages([]);
        localStorage.removeItem('seva-chat-messages');
    };

    // Auto-scroll to bottom when new messages arrive
    // Uses scrollTop on the container instead of scrollIntoView to avoid scrolling the whole page
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length > 0 && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            id="faq"
            className="w-full max-w-4xl mx-auto rounded-2xl bg-white border-4 border-orange-400 shadow-lg flex flex-col p-8 gap-6 my-16"
            style={{ minHeight: "600px" }}
        >
            {/* Header Section */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-black tracking-wide">
                        Ask Raghav 🐘
                    </h2>
                    {/* Clear button (only shows when there are messages) — gated behind hydrated to prevent SSR mismatch */}
                    {hydrated && messages.length > 0 && (
                        <button
                            onClick={handleClearChat}
                            className="text-xs text-gray-500 hover:text-red-500 underline"
                            title="Clear conversation"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <p className="text-gray-600 text-sm">
                    Questions about membership, events, and more!
                </p>
            </div>

            {/* Messages Area (scrollable) — ref used to scroll inside container only, not whole page */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 px-2">

                {/* Show suggestions if no messages yet — gated behind hydrated */}
                {hydrated && messages.length === 0 && (
                    <div className="space-y-3">
                        <p className="text-gray-600 text-sm text-center mb-4">
                            👋 Hi! I'm here to answer questions about Seva. Try asking:
                        </p>

                        {/* Grid of clickable suggestion buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm transition-colors border border-green-200"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Chat Messages */}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[85%] p-4 rounded-2xl ${
                                message.role === 'user'
                                    ? 'bg-green-500 text-white rounded-br-sm'  // User: green bubble, right aligned
                                    : 'bg-gray-100 text-gray-800 rounded-bl-sm' // AI: gray bubble, left aligned
                            }`}
                        >
                            {/* Render HTML content (includes clickable links from AI) */}
                            <div
                                className="text-sm whitespace-pre-wrap
                                    [&_a]:text-green-600
                                    [&_a]:underline
                                    [&_a]:font-semibold
                                    [&_a:hover]:text-green-700"
                                dangerouslySetInnerHTML={{ __html: message.content }}
                            />
                        </div>
                    </div>
                ))}

                {/* Loading indicator (bouncing dots) */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-sm">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                                <span className="text-sm text-gray-600">Raghav is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Section */}
            <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 pt-4"
            >
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask about Seva..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <PaperPlaneRight size={20} weight="fill" />
                    </button>
                </div>
            </form>
        </div>
    );
}