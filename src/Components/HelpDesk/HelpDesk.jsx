import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AIChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botReply = generateAIResponse();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
    }, 1000);
  };

  const generateAIResponse = () => {
    const responses = [
      "That's interesting! Tell me more.",
      "I see! What else would you like to discuss?",
      "I'm here to help! What do you need?",
      "That sounds exciting!",
      "Could you clarify that?",
      "Let's explore that idea further.",
      "I'm happy to chat! What’s on your mind?",
      "That’s a great point!",
      "I'm learning from you. Keep going!",
      "I appreciate that insight!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="chat-container bg-white shadow rounded p-3"
        style={{ width: "80%" }}
      >
        <h5 className="text-center mb-3">Help Desk Chat Bot</h5>
        <div
          className="chat-box border rounded p-2 d-flex flex-column"
          style={{ height: "400px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded mt-2 ${msg.sender === "user" ? "bg-primary text-white ms-auto" : "bg-secondary text-white me-auto"}`}
              style={{
                maxWidth: "75%",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="d-flex border-top p-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary ms-2" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatBox;