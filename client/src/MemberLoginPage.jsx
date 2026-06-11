import React from "react";

function MemberLoginPage({ onBack }) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const joinedRooms = ["General", "Design", "Support", "Project Updates"];

  const handleLogin = () => {
    if (!name.trim() || !password.trim()) return;
    setLoggedIn(true);
  };

  const styles = {
    card: {
      maxWidth: "420px",
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
      padding: "10px 12px",
      borderRadius: "10px",
      border: "1px solid #d0d7de",
      marginBottom: "12px",
      boxSizing: "border-box"
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
    secondaryButton: {
      flex: "1 1 140px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      background: "#f8fafc",
      color: "#0f172a",
      cursor: "pointer",
      fontWeight: 600
    },
    roomList: {
      listStyle: "none",
      padding: 0,
      margin: "12px 0 0"
    },
    roomItem: {
      padding: "10px 12px",
      borderRadius: "10px",
      background: "#eff6ff",
      marginBottom: "8px",
      color: "#1e3a8a"
    }
  };

  return (
    <div style={styles.card}>
      {loggedIn ? (
        <>
          <h1 style={{ marginTop: 0 }}>Welcome back, {name.trim()}</h1>
          <p style={{ color: "#475569", marginBottom: "8px" }}>
            Here are the rooms you have joined as a member.
          </p>
          <ul style={styles.roomList}>
            {joinedRooms.map((room) => (
              <li key={room} style={styles.roomItem}>{room}</li>
            ))}
          </ul>
          <div style={{ ...styles.buttonRow, marginTop: "16px" }}>
            <button style={styles.secondaryButton} onClick={onBack}>Back</button>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ marginTop: 0 }}>Member Login</h1>
          <p style={{ color: "#475569", marginBottom: "16px" }}>
            Enter your member name and password to view your joined rooms.
          </p>

          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
          />
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div style={styles.buttonRow}>
            <button style={styles.button} onClick={handleLogin}>Continue</button>
            <button style={styles.secondaryButton} onClick={onBack}>Back</button>
          </div>
        </>
      )}
    </div>
  );
}

export default MemberLoginPage;
