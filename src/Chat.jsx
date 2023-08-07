import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // 컴포넌트 외부에 소켓 생성

const Chat = (props) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatHistory(prevChatHistory => [...prevChatHistory, msg]); // 기존 채팅 내역을 사용하여 상태를 업데이트
    });

    return () => {
      socket.disconnect();
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행

  const handleSendClick = () => {
    const newMessage = { user: props.nickname, text: message };
    console.log('Sending message:', newMessage); // 이 줄을 추가해주세요.
    socket.emit('chat message', newMessage); // 서버에 메시지 전송
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
  };

  return (
    <div>
      <h1>Welcome, {props.nickname}!</h1>
      <div>
        {chatHistory.map((chat, index) => (
          <p key={index}>{chat.user}: {chat.text}</p>
        ))}
      </div>
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default Chat;