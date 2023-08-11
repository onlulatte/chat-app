import React, { useState, useEffect } from 'react';
import './Chat.scss';
import { io } from 'socket.io-client';
import { Container, TextField, Button, Typography, Card, Grid } from '@mui/material';

/* redux */
import { useSelector } from 'react-redux';

const socket = io('http://localhost:3001'); // 컴포넌트 외부에 소켓 생성

const Chat = (props) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const nickname = useSelector((state) => state.nickname) || localStorage.getItem('nickname');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    // 기존 채팅 내역을 가져오기
    fetch('http://localhost:3001/chat')
      .then((response) => response.json())
      .then((data) => {
        setChatHistory(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the messages:', error);
      });

    // 새 메시지를 입력하면 채팅 내역을 업데이트
    socket.on('chat message', (msg) => {
      console.log(msg);
      setChatHistory(prevChatHistory => [...prevChatHistory, msg]); // 기존 채팅 내역을 사용하여 상태를 업데이트
    });

    return () => {
      socket.disconnect();
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행

  const handleSendClick = (e) => {
    const newMessage = { user: nickname, text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) };
    e.preventDefault();
    socket.emit('chat message', newMessage); // 서버에 메시지 전송
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: '100%', padding: 3, borderRadius: 5 }}>
      <Grid container spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
        <Grid item xs={2}>
          <img src="/profile.jpg" alt="프로필 사진" className="profile-img" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5">
            {nickname}님, 반갑습니다!
          </Typography>
        </Grid>
      </Grid>
        <form onSubmit={handleSendClick}>
          <div className="msg-area">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`msg ${chat.user === nickname ? 'right-msg' : 'left-msg'}`}>
                <div className="msg-bubble">
                  <div className="msg-bubble-header">
                    <span className="user-name">{chat.user}</span>
                    <span className="msg-time">{ chat.time || new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }</span>
                  </div>
                  <div className="msg-bubble-content">
                    <span className="msg-content">{chat.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                value={message}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" type="submit" sx={{ width: '100%', height: '100%' }}>
                전송
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default Chat;
