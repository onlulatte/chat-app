const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Chat = require('./models/chatModel');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Route 연결
app.use('/', chatRoutes);

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
    // console.log('Received message:', msg);

    const chatMessage = new Chat({
      user: msg.user,
      text: msg.text,
      timestamp: new Date(),
    });

    console.log(chatMessage);

    try {
      await chatMessage.save();
      io.emit('new chat message', chatMessage);  // 모든 클라이언트에게 새 메시지 전송
    } catch (err) {
      console.log(err);
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
