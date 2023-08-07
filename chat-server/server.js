const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose'); // mongoose 추가
const Chat = require('./models/chatModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB 연결 코드
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB 연결 성공');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 오류:', err);
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('chat message', async (msg) => {
    console.log('Received message:', msg);

    const chatMessage = new Chat({
      user: msg.user,
      text: msg.text,
      timestamp: new Date(),
    });

    try {
      await chatMessage.save();
      console.log('Message saved successfully');
    } catch (err) {
      console.log(err);
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
