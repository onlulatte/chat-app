const express = require('express');
const Chat = require('../models/chatModel');
const router = express.Router();

router.get('/chat', async (req, res) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
