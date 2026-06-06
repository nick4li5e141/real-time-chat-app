// Description: this file is the main component of the chat application. It allows users to join a room and send messages to that room. 
// It also listens for incoming messages and updates the chat accordingly.

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

// to start the project you need to start the server first by using cd server then npm start and then start the client  using the cd command then npm.

import { useEffect, useState } from "react";
import { socket } from "./socket";


function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState("");

  // Join room
  const joinRoom = () => {
    const nextRoom = room.trim();

    if (nextRoom !== "") {
      socket.emit("join_room", nextRoom);
      setJoinedRoom(nextRoom);
      setChat([]);
      setMessage("");
    }
  };

  // Send message
  const sendMessage = () => {
    if (!joinedRoom || message.trim() === "") return;

    const messageData = {
      room: joinedRoom,
      message: message.trim(),
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

    return () => {
      socket.off("receive_message");
    };
  }, []);
// styling for the container of the message box and the input field and the button
  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      background: '#fff',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      width: '100%',
      maxWidth: '860px',
      boxSizing: 'border-box'
    },
    // styling for the message box
    textBox: {
      width: '100%',
      minHeight: '100px',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      resize: 'none',
      fontSize: '16px',
      outline: 'none',
      marginBottom: '12px',
      boxSizing: 'border-box',
      display: 'block'
    },
    // styling for the input field
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '12px',
      boxSizing: 'border-box',
      display: 'block'
    },
    // styling for the button
    button: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      background: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      marginRight: '8px',
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat App</h1>
      <p style={{ marginBottom: '8px', color: '#555' }}>
        {joinedRoom ? `Current room: ${joinedRoom}` : 'Enter a room name first, then join it to start chatting.'}
      </p>
      <input
        style={styles.input}
        value={room}
        placeholder="Create or enter a room name"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button style={styles.button} onClick={joinRoom}>Create / Join Room</button>
      <textarea
        style={styles.textBox}
        value={message}
        placeholder={joinedRoom ? 'Type your message' : 'Join a room before sending messages'}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!joinedRoom}
      />
      <button style={styles.button} onClick={sendMessage} disabled={!joinedRoom}>
        Send
      </button>
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