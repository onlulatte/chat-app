import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Login from './Login';
import Chat from './Chat';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // 다크 모드 활성화
  },
});

const App = () => {
  const [nickname, setNickname] = useState('');

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setNickname={setNickname} />}
          />
          <Route
            path="/chat"
            element={<Chat nickname={nickname} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
