import React, { useState } from 'react';
import '../../chat.css'; 

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'hello', time: '3:15 PM' },
    { text: 'may i ask for the price of the item', time: '3:18 PM' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { text: inputValue, time: currentTime }]);
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button">Back</button>
        <span className="chat-date">TODAY</span>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <div className="message-bubble">
              <p>{message.text}</p>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
        
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
