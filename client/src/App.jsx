// Description: this file is the main component of the chat application. It allows users to join a room and send messages to that room. 
// It also listens for incoming messages and updates the chat accordingly.

import { useEffect, useState } from "react";
import { socket } from "./socket";

// shoerter version of this would be:
// git add .
//git commit -m "Update"
//git push origin main


// Description: this file is the main component of the chat application. It allows users to join a room and send messages to that room. 
// It also listens for incoming messages and updates the chat accordingly.

// THIS IS WHERE THE CLIENT INTERFACE WOULD BE 

//cd /mnt/c/Users/nikou/OneDrive/Desktop/chat-app
//git add .
//git commit -m "Initial commit"
//git branch -M main
//git remote add origin https://github.com/YOUR_USERNAME/chat-app.git
//git push -u origin main
//import { useEffect, useState } from "react";
//import { socket } from "./socket";

// shoerter version of this would be:
// git add .
//git commit -m "Update"
//git push origin main



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