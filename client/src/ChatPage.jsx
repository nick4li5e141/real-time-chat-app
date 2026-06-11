// this page is the main chat interface, it connects to the backend via socket.io and allows users to send and receive messages in real time.

import React from "react";

function ChatPage({ displayName, mode, room, onBack, socket, onSendMessage }) {
  const [message, setMessage] = React.useState("");
  const [chat, setChat] = React.useState([]);

  React.useEffect(() => {
    const handleReceive = (data) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [socket]);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const messageData = {
      room,
      sender: displayName,
      mode,
      message: trimmed,
      time: new Date().toLocaleTimeString()
    };

    socket.emit("send_message", messageData);
    setChat((prev) => [...prev, messageData]);
    setMessage("");
  };

  const styles = {
    card: {
      maxWidth: "860px",
      width: "100%",
      margin: "0 auto",
      padding: "24px",
      borderRadius: "16px",
      background: "#fff",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      boxSizing: "border-box"
    },
    input: {
      width: "100%",
      minHeight: "100px",
      resize: "none",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #d0d7de",
      boxSizing: "border-box",
      marginBottom: "12px"
    },
    buttonRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "12px"
    },
    button: {
      padding: "10px 14px",
      borderRadius: "10px",
      border: "none",
      background: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600
    },
    secondaryButton: {
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      background: "#f8fafc",
      color: "#0f172a",
      cursor: "pointer",
      fontWeight: 600
    },
    message: {
      margin: "6px 0",
      padding: "8px 10px",
      borderRadius: "8px",
      background: "#f8fafc"
    },
    meta: {
      color: "#64748b",
      fontSize: "12px"
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={{ marginTop: 0 }}>Room: {room}</h1>
      <p style={{ color: "#475569", marginBottom: "12px" }}>
        Signed in as <strong>{displayName}</strong> ({mode})
      </p>

      <textarea
        style={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />

      <div style={styles.buttonRow}>
        <button style={styles.button} onClick={sendMessage}>Send</button>
        <button style={styles.secondaryButton} onClick={onBack}>Back to Entry</button>
      </div>

      <div>
        {chat.map((msg, i) => (
          <div key={i} style={styles.message}>
            <strong>{msg.sender || "System"}</strong>
            <span style={styles.meta}> · {msg.time}</span>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatPage;
