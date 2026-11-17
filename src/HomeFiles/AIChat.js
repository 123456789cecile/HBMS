
import React, { useState, useEffect, useRef } from "react";
import "./AIChat.css";

function AIChat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello! Welcome to HBMS. I am your AI Hospital Assistant. How can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const messagesEndRef = useRef(null);

    // Automatically scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    // Send message to the backend
    const handleSend = async (e) => {
        e.preventDefault();

        const userMessage = message.trim();

        if (!userMessage || loading) {
            return;
        }

        setError("");

        // Display user's message
        setMessages((previousMessages) => [
            ...previousMessages,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/ai/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong."
                );
            }

            if (!data.reply) {
                throw new Error("The AI returned an empty response.");
            }

            // Display AI response
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: data.reply
                }
            ]);

        } catch (err) {
            console.error("AI Chat Error:", err);

            setError(
                err.message === "Failed to fetch"
                    ? "Could not connect to the server. Check your backend."
                    : err.message
            );

        } finally {
            setLoading(false);
        }
    };

    // Allow Enter to send and Shift + Enter for a new line
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <div className="ai-chat-page">

            <div className="ai-chat-container">

                {/* Chat Header */}
                <div className="ai-chat-header">

                    <div className="ai-header-icon">
                        <i className="fas fa-robot"></i>
                    </div>

                    <div className="ai-header-info">
                        <h2>HBMS AI Assistant</h2>
                        <p>
                            <span className="online-dot"></span>
                            Online Assistant
                        </p>
                    </div>

                    <div className="ai-header-label">
                        AI Support
                    </div>

                </div>

                {/* Chat Messages */}
                <div className="ai-chat-messages">

                    <div className="ai-date-label">
                        Hospital Assistant
                    </div>

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`ai-message-row ${msg.sender}`}
                        >

                            {msg.sender === "ai" && (
                                <div className="ai-message-icon">
                                    <i className="fas fa-robot"></i>
                                </div>
                            )}

                            <div className="ai-message-bubble">
                                <p>{msg.text}</p>
                            </div>

                            {msg.sender === "user" && (
                                <div className="user-message-icon">
                                    <i className="fas fa-user"></i>
                                </div>
                            )}

                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="ai-message-row ai">

                            <div className="ai-message-icon">
                                <i className="fas fa-robot"></i>
                            </div>

                            <div className="ai-message-bubble typing-bubble">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                        </div>
                    )}

                    <div ref={messagesEndRef}></div>

                </div>

                {/* Error Message */}
                {error && (
                    <div className="ai-error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}

                {/* Chat Input */}
                <form
                    className="ai-chat-input-area"
                    onSubmit={handleSend}
                >

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me about hospital services..."
                        rows="1"
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={!message.trim() || loading}
                        className="ai-send-button"
                        aria-label="Send message"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>

                </form>

                <p className="ai-chat-disclaimer">
                    AI can make mistakes. For medical advice,
                    please consult a qualified healthcare professional.
                </p>

            </div>

        </div>
    );
}

export default AIChat;
