import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "../../assets/images/login.jpg"; // Adjust path if needed

const AIChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmall = windowWidth <= 576;
  const isMedium = windowWidth <= 768;

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

  const containerStyle = {
    width: isSmall ? "100%" : isMedium ? "90%" : "80%",
    maxWidth: "700px",
    minHeight: isSmall ? "100vh" : "500px",
    padding: isSmall || isMedium ? "1rem" : "1.5rem",
    borderRadius: isSmall ? "0" : "0.75rem",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // more transparent
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    color: "#fff",
  };

  const chatBoxStyle = {
    height: isSmall ? "320px" : isMedium ? "350px" : "400px",
    overflowY: "auto",
    backgroundColor: "rgba(255,255,255,0.08)", // more transparent
    borderRadius: "0.5rem",
    padding: "1rem",
    backdropFilter: "blur(6px)",
    color: "#fff",
  };

  const headingStyle = {
    fontSize: isSmall ? "1.1rem" : "1.5rem",
    fontWeight: "bold",
    color: "#ffffff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
    paddingBottom: "0.5rem",
  };

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
  };

  const messageStyle = (sender) => ({
    maxWidth: "75%",
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    marginBottom: "0.5rem",
    alignSelf: sender === "user" ? "flex-end" : "flex-start",
    backgroundColor: sender === "user" ? "#0d6efd" : "#343a40",
    color: "#fff",
    textAlign: sender === "user" ? "right" : "left",
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={containerStyle}>
        <div className="text-center mb-3" style={headingStyle}>
          Help Desk Chat Bot
        </div>

        <div style={chatBoxStyle} className="d-flex flex-column mb-3">
          {messages.map((msg, index) => (
            <div key={index} style={messageStyle(msg.sender)}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            style={inputStyle}
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