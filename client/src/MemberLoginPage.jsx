

import React from "react";
import { validateAccount } from "./accounts";
import { createRoom, loadRooms, saveRooms } from "./rooms";

function MemberLoginPage({
  onBack,
  onSignOut,
  onEnterRoom,
  initialLoggedIn = false,
  initialMemberAccount = null
}) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(initialLoggedIn);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [memberAccount, setMemberAccount] = React.useState(initialMemberAccount);
  const [rooms, setRooms] = React.useState(loadRooms());
  const [newRoomName, setNewRoomName] = React.useState("");
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [selectedRooms, setSelectedRooms] = React.useState([]);

  React.useEffect(() => {
    setLoggedIn(initialLoggedIn);
    setMemberAccount(initialMemberAccount);
  }, [initialLoggedIn, initialMemberAccount]);

  const handleLogin = () => {
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedPassword) {
      setErrorMessage("Please enter both your member name and password.");
      return;
    }

    const account = validateAccount(trimmedName, trimmedPassword);

    if (!account) {
      setErrorMessage("No matching member account was found.");
      return;
    }

    setMemberAccount(account);
    setRooms(loadRooms());
    setErrorMessage("");
    setLoggedIn(true);
  };

  const handleCreateRoom = () => {
    const result = createRoom(newRoomName);
    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    setRooms(result.rooms);
    setNewRoomName("");
    setErrorMessage("");
  };

  const toggleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
    setSelectedRooms([]);
  };

  const toggleRoomSelection = (room) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const handleDeleteRooms = () => {
    if (selectedRooms.length === 0) return;

    const updatedRooms = rooms.filter((room) => !selectedRooms.includes(room));
    saveRooms(updatedRooms);
    setRooms(updatedRooms);
    setSelectedRooms([]);
    setDeleteMode(false);
    setErrorMessage("");
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
    passwordRow: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    },
    passwordToggle: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: 600
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
          <h1 style={{ marginTop: 0 }}>Welcome back, {memberAccount?.name}</h1>
          <p style={{ color: "#475569", marginBottom: "8px" }}>
            Create a room or open one that already exists.
          </p>

          <input
            style={styles.input}
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="New room name"
          />

          <div style={styles.buttonRow}>
            <button style={styles.button} onClick={handleCreateRoom}>Create Room</button>
            <button style={styles.secondaryButton} onClick={toggleDeleteMode}>
              {deleteMode ? "Cancel" : "Delete Rooms"}
            </button>
            <button style={styles.secondaryButton} onClick={onSignOut}>Sign-Out</button>
          </div>

          {errorMessage ? <p style={{ color: "#b91c1c", marginTop: "8px" }}>{errorMessage}</p> : null}

          <h2 style={{ fontSize: "18px", margin: "16px 0 8px" }}>Available rooms</h2>
          <ul style={styles.roomList}>
            {rooms.map((room) => {
              const isSelected = selectedRooms.includes(room);

              return (
                <li
                  key={room}
                  style={{
                    ...styles.roomItem,
                    background: isSelected ? "#dbeafe" : "#eff6ff",
                    border: isSelected ? "1px solid #60a5fa" : "1px solid transparent"
                  }}
                >
                  {deleteMode ? (
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        width: "100%"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRoomSelection(room)}
                      />
                      <span>{room}</span>
                    </label>
                  ) : (
                    <button
                      onClick={() =>
                        onEnterRoom({ name: memberAccount.name, room, mode: "member" })
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#1e3a8a",
                        cursor: "pointer",
                        fontWeight: 600,
                        padding: 0,
                        textAlign: "left",
                        width: "100%"
                      }}
                    >
                      {room}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {deleteMode ? (
            <button
              style={{
                ...styles.button,
                width: "100%",
                marginTop: "12px"
              }}
              onClick={handleDeleteRooms}
              disabled={selectedRooms.length === 0}
            >
              {selectedRooms.length > 0 ? "Delete" : "Delete Rooms"}
            </button>
          ) : null}
        </>
      ) : (
        <>
          <h1 style={{ marginTop: 0 }}>Member Login</h1>
          <p style={{ color: "#475569", marginBottom: "16px" }}>
            Enter your member name and password to view your joined rooms.
          </p>
          {errorMessage ? (
            <p style={{ color: "#b91c1c", marginBottom: "12px" }}>{errorMessage}</p>
          ) : null}

          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
          />
          <div style={styles.passwordRow}>
            <input
              style={{ ...styles.input, marginBottom: 0 }}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              style={styles.passwordToggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

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
