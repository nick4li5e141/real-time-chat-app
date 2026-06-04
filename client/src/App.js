// Description: this file is the main component of the chat application. It allows users to join a room and send messages to that room. 
// It also listens for incoming messages and updates the chat accordingly.

import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("");

  // Join room
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // Send message
  const sendMessage = () => {
    const messageData = {
      room,
      message,
      time: new Date().toLocaleTimeString()
    };

    socket.emit("send_message", messageData);

    setChat((prev) => [...prev, messageData]);
    setMessage("");
  };

  // Receive message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div>
      <h1>Chat App</h1>

      <input
        placeholder="Room name"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <br />

      <input
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        {chat.map((msg, i) => (
          <p key={i}>
            [{msg.time}] {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;