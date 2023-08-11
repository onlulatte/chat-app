import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Card } from '@mui/material';

/* redux */
import { useDispatch } from 'react-redux';
import { setNickname } from './redux/actions';

const Login = () => {
  const [nicknameInput, setNicknameInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    nicknameInput === '' ? alert('닉네임을 입력하세요.') : navigateToChat();
  };

  const navigateToChat = () => {
    dispatch(setNickname(nicknameInput));
    localStorage.setItem('nickname', nicknameInput);
    setNickname(nicknameInput);
    navigate('/chat');
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ textAlign: 'center', p: 3 }}>
        <form onSubmit={handleLogin}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              React Chat
            </Typography>
            <TextField
              label="닉네임"
              variant="outlined"
              fullWidth
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
          </Box>
          <Box>
            <Button fullWidth variant="contained" color="primary" type="submit">
              접속
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
