require("dotenv").config();
const express = require("express");
const cors = require("cors");

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const contentRoutes = require("./routes/content");
const broadcastRouter = require("./routes/broadcast");
const { router: stateRouter } = require("./routes/state");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const tvNamespace = io.of("/tv");

tvNamespace.on("connection", (socket) => {
  const { channel = "default" } = socket.handshake.query;

  console.log(`TV connected on channel: ${channel} (id: ${socket.id})`);

  socket.join(channel);

  socket.on("disconnect", () => {
    console.log(`TV disconnected from channel: ${channel}`);
  });
});

app.use(
  cors({
    origin: process.env.URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/broadcast", broadcastRouter(io));
app.use("/api/state", stateRouter);

io.on("connection", (socket) => {
  console.log("TV connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("TV disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server, io };
