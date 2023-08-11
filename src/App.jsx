import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* material */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, deepPurple } from '@mui/material/colors';

/* Router */
import Login from './Login';
import Chat from './Chat';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[400],
    },
  },
});

const App = () => {
  const [nickname, setNickname] = useState('');

  return (
    <ThemeProvider theme={theme}>
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
