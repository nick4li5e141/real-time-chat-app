// Description: this file is the main entry point for the chat server. 
// It sets up the Express app, creates an HTTP server, and initializes the Socket.IO server.

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Chat server is running");
});

const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const connectedUsers = new Map();

const normalizeName = (value) => (value || "").trim().toLowerCase();

const findSocketByName = (name) => {
  const targetName = normalizeName(name);

  for (const [socketId, user] of connectedUsers.entries()) {
    if (normalizeName(user.name) === targetName) {
      return io.sockets.sockets.get(socketId);
    }
  }

  return null;
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (payload) => {
    const room = typeof payload === "string" ? payload : payload.room;
    const name = typeof payload === "string" ? null : payload.name;

    if (!room) return;

    socket.join(room);

    if (name) {
      connectedUsers.set(socket.id, { name, room });
    } else {
      const existingUser = connectedUsers.get(socket.id) || {};
      connectedUsers.set(socket.id, { ...existingUser, room });
    }
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("send_invite", ({ room, fromUser, toUser }) => {
    const targetSocket = findSocketByName(toUser);

    console.log("Invite request", { room, fromUser, toUser, connectedUsers: Array.from(connectedUsers.values()) });

    if (!targetSocket) {
      socket.emit("receive_message", {
        sender: "System",
        message: `No user named ${toUser} is online.`,
        time: new Date().toLocaleTimeString(),
        system: true
      });
      return;
    }

    targetSocket.emit("receive_invite", { room, fromUser, toUser });
  });

  socket.on("accept_invite", ({ room, fromUser, toUser }) => {
    const currentUser = connectedUsers.get(socket.id);
    const userName = currentUser?.name || toUser;

    socket.join(room);
    connectedUsers.set(socket.id, { name: userName, room });

    const inviterSocket = findSocketByName(fromUser);

    if (inviterSocket) {
      inviterSocket.emit("invite_accepted", { room, invitedUser: userName });
    }

    socket.emit("invite_accepted", { room, invitedUser: userName });
    io.to(room).emit("receive_message", {
      sender: "System",
      message: `${userName} joined the room`,
      time: new Date().toLocaleTimeString(),
      system: true
    });
  });

  socket.on("respond_to_invite", ({ room, fromUser, toUser, accepted }) => {
    const currentUser = connectedUsers.get(socket.id);
    const userName = currentUser?.name || toUser;

    if (accepted) {
      socket.join(room);
      connectedUsers.set(socket.id, { name: userName, room });

      const inviterSocket = findSocketByName(fromUser);
      if (inviterSocket) {
        inviterSocket.emit("invite_accepted", { room, invitedUser: userName });
      }

      socket.emit("invite_accepted", { room, invitedUser: userName });
      io.to(room).emit("receive_message", {
        sender: "System",
        message: `${userName} joined the room`,
        time: new Date().toLocaleTimeString(),
        system: true
      });
    }

    const targetSocket = findSocketByName(fromUser);
    if (targetSocket) {
      targetSocket.emit("invite_decision", {
        room,
        fromUser: userName,
        message: accepted ? `${userName} accepted your invite to ${room}.` : `${userName} declined your invite to ${room}.`
      });
    }
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.id);
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(3001, () => {
  console.log("Server running on port 3001");
});