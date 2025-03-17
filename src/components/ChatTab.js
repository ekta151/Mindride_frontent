import React, { useState } from 'react';
import './ChatTab.css'; // You can create a CSS file for styling

function ChatTab() {
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;

        const newUserMessage = { text: message, sender: 'user' };
        setChatHistory(currentHistory => [...currentHistory, newUserMessage]);
        setMessage('');
        setIsBotTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            if (!response.ok) {
                setIsBotTyping(false);
                const errorText = response.status === 404 ? 'Not Found' : `${response.status} ${response.statusText}`;
                console.error("Backend error:", errorText);
                setChatHistory(currentHistory => [...currentHistory, {
                    text: `Bot: Error communicating with the chat service. (${errorText})`, sender: 'bot', isError: true
                }]);
                return;
            }

            const data = await response.json();
            const botReply = data.reply;
            setIsBotTyping(false);
            setChatHistory(currentHistory => [...currentHistory, { text: botReply, sender: 'bot' }]);

        } catch (error) {
            setIsBotTyping(false);
            console.error("Error sending chat message:", error);
            setChatHistory(currentHistory => [...currentHistory, {
                text: "Bot: Error communicating with the chat service.", sender: 'bot', isError: true
            }]);
        }
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`message ${chat.sender} ${chat.isError ? 'error' : ''}`}>
                        {chat.text}
                    </div>
                ))}
                {isBotTyping && <div className="message bot typing">Bot is typing...</div>}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-area">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="chat-input"
                    disabled={isBotTyping}
                />
                <button type="submit" className="send-button" disabled={isBotTyping} buttonClass="submit-button">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatTab;