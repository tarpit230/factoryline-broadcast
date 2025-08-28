const express = require("express");
const pool = require("../db");

const router = express.Router();

// In-memory cache (optional: you can store in DB if you prefer)
const latestContentByChannel = {};

// Called inside broadcast route to update state
function updateChannelState(channel, content) {
  latestContentByChannel[channel] = content;
}

// Expose state for TVs
router.get("/:channel", (req, res) => {
  const { channel } = req.params;
  const content = latestContentByChannel[channel] || null;
  res.json(content);
});

module.exports = { router, updateChannelState };
