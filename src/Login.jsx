import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Card } from '@mui/material';

const Login = ({ setNickname }) => {
  const [nicknameInput, setNicknameInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setNickname(nicknameInput);
    navigate('/chat');
  };

  return (
      <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ textAlign: 'center', p:3 }}>
          <Typography variant="subtitle1" mb={2}>
            닉네임을 입력하세요.
          </Typography>
          <form onSubmit={handleLogin}>
            <Box
              sx={{ mb: 2 }}
              color='#fff'
              >
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
