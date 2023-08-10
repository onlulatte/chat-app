import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Container, TextField, Button, Typography, Card, List, ListItem } from '@mui/material';

const socket = io('http://localhost:3001'); // 컴포넌트 외부에 소켓 생성

const Chat = (props) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log(msg);
      setChatHistory(prevChatHistory => [...prevChatHistory, msg]); // 기존 채팅 내역을 사용하여 상태를 업데이트
    });

    return () => {
      socket.disconnect();
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행

  const handleSendClick = (e) => {
    const newMessage = { user: props.nickname, text: message };
    console.log(newMessage);
    e.preventDefault();
    socket.emit('chat message', newMessage); // 서버에 메시지 전송
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {props.nickname}!
        </Typography>
        <form onSubmit={handleSendClick}>
          <List>
            {chatHistory.map((chat, index) => (
              <ListItem key={index}>{chat.user}: {chat.text}</ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            value={message}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Chat;
