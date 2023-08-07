const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: Date,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat; // 모델을 내보냅니다.
