// this page is for testing the account creation flow, it doesn't actually create accounts or connect to the backend, 
// it's just a demo page to show how the flow would work.

import React from "react";

function LoginPage({ onEnter, onMemberClick, onMemberLoginClick, onSettingsClick, theme = "light" }) {
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");

  const handleEnter = (mode) => {
    const trimmedName = name.trim();
    const trimmedRoom = room.trim();

    if (!trimmedName || !trimmedRoom) return;

    onEnter({ name: trimmedName, room: trimmedRoom, mode });
  };

  const isDark = theme === "dark";
  const styles = {
    card: {
      maxWidth: "420px",
      width: "100%",
      margin: "0 auto",
      padding: "24px",
      borderRadius: "16px",
      background: isDark ? "#111827" : "#fff",
      color: isDark ? "#f9fafb" : "#0f172a",
      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.35)" : "0 10px 30px rgba(0,0,0,0.12)",
      boxSizing: "border-box"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "10px",
      border: isDark ? "1px solid #334155" : "1px solid #d0d7de",
      marginBottom: "12px",
      boxSizing: "border-box",
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#f9fafb" : "#0f172a"
    },
    buttonRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap"
    },
    button: {
      flex: "1 1 140px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "none",
      background: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600
    },
    button2: {
      flex: "1 1 140px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "none",
      background: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600
    },
    secondaryButton: {
      flex: "1 1 140px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: isDark ? "1px solid #334155" : "1px solid #cbd5e1",
      background: isDark ? "#1f2937" : "#f8fafc",
      color: isDark ? "#f9fafb" : "#0f172a",
      cursor: "pointer",
      fontWeight: 600
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={{ marginTop: 0 }}>Welcome to Chat App</h1>
      <p style={{ color: isDark ? "#cbd5e1" : "#475569", marginBottom: "16px" }}>
        Start here: choose your name, pick a room, and enter as a guest or member.
      </p>

      <input
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />

      <input
        style={styles.input}
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room name"
      />

      <div style={styles.buttonRow}>
        <button style={styles.button} onClick={() => handleEnter("guest")}>Join as Guest</button>
        <button style={styles.button2} onClick={onMemberLoginClick}>Join as Member</button>
        <button style={styles.secondaryButton} onClick={onMemberClick}>sign up</button>
      </div>

      <div style={{ marginTop: "12px" }}>
        <button style={styles.secondaryButton} onClick={onSettingsClick}>
          Settings
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
