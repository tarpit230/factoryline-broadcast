const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let type = "OTHER";
    if (file.mimetype.startsWith("image")) type = "IMAGE";
    else if (file.mimetype.startsWith("video")) type = "VIDEO";
    else if (file.mimetype === "application/pdf") type = "PDF";

    const url = `/uploads/${file.filename}`;

    const result = await pool.query(
      `INSERT INTO content (filename, originalname, mimetype, type, url, size)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [file.filename, file.originalname, file.mimetype, type, url, file.size]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM content ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
