const express = require("express");
const pool = require("../db");

const router = express.Router();

const latestContentByChannel = {};

function updateChannelState(channel, content) {
  latestContentByChannel[channel] = content;
}

router.get("/:channel", (req, res) => {
  const { channel } = req.params;
  const content = latestContentByChannel[channel] || null;
  res.json(content);
});

module.exports = { router, updateChannelState };
