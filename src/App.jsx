import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login'; // 파일 이름 변경
import Chat from './Chat';

const App = () => {
  const [nickname, setNickname] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setNickname={setNickname} />} // 컴포넌트 이름 변경
        />
        <Route
          path="/chat"
          element={<Chat nickname={nickname} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
