// routes/broadcast.js
const express = require("express");
const pool = require("../db");
const { updateChannelState } = require("./state");

module.exports = (io) => {
  const router = express.Router();

  // Broadcast content
  router.post("/", async (req, res) => {
    try {
      const { contentId, channel = "default" } = req.body;
      if (!contentId) return res.status(400).json({ error: "contentId required" });

      const result = await pool.query("SELECT * FROM content WHERE id = $1", [contentId]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Content not found" });

      const content = result.rows[0];

      updateChannelState(channel, content);

      // Send to all TVs
      io.of("/tv").to(channel).emit("broadcast", content);

      res.json({ success: true, broadcasted: content });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Broadcast failed" });
    }
  });

  return router;
};
