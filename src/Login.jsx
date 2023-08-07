import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const Login = ({ setNickname }) => {
  const [nicknameInput, setNicknameInput] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = () => {
    setNickname(nicknameInput);
    navigate('/chat'); // 페이지 이동
  };

  return (
    <div>
      <h1>닉네임을 입력하세요.</h1>
      <TextField
        label="닉네임"
        variant="outlined"
        value={nicknameInput}
        onChange={e => setNicknameInput(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        접속
      </Button>
    </div>
  );
};

export default Login;
