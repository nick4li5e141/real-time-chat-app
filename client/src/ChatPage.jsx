// this page is the main chat interface, it connects to the backend via socket.io and allows users to send and receive messages in real time.

import React from "react";

const STORAGE_PREFIX = "chat-app-history";

function ChatPage({ displayName, mode, room, onBack, socket }) {
  const [message, setMessage] = React.useState("");
  const [chat, setChat] = React.useState([]);
  const [inviteTarget, setInviteTarget] = React.useState("");
  const [pendingInvite, setPendingInvite] = React.useState(null);
  const [hasLoadedHistory, setHasLoadedHistory] = React.useState(false);

  React.useEffect(() => {
    setHasLoadedHistory(false);
    const savedHistory = localStorage.getItem(`${STORAGE_PREFIX}:${room}`);

    if (savedHistory) {
      try {
        setChat(JSON.parse(savedHistory));
      } catch {
        setChat([]);
      }
    } else {
      setChat([]);
    }

    setHasLoadedHistory(true);
  }, [room]);

  React.useEffect(() => {
    if (!hasLoadedHistory) return;
    localStorage.setItem(`${STORAGE_PREFIX}:${room}`, JSON.stringify(chat));
  }, [chat, room, hasLoadedHistory]);

  React.useEffect(() => {
    const handleReceive = (data) => {
      setChat((prev) => [...prev, data]);
    };

    const handleInvite = (data) => {
      setPendingInvite(data);
      setChat((prev) => [
        ...prev,
        {
          sender: "System",
          message: `${data.fromUser} invited you to join ${data.room}`,
          time: new Date().toLocaleTimeString(),
          system: true
        }
      ]);
    };

    const handleInviteAccepted = (data) => {
      setChat((prev) => [
        ...prev,
        {
          sender: "System",
          message: `${data.invitedUser} joined ${data.room}`,
          time: new Date().toLocaleTimeString(),
          system: true
        }
      ]);
      setPendingInvite(null);
    };

    socket.on("receive_message", handleReceive);
    socket.on("receive_invite", handleInvite);
    socket.on("invite_accepted", handleInviteAccepted);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("receive_invite", handleInvite);
      socket.off("invite_accepted", handleInviteAccepted);
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

  const sendInvite = () => {
    const trimmed = inviteTarget.trim();
    if (!trimmed) return;

    const inviteData = {
      room,
      fromUser: displayName,
      toUser: trimmed
    };

    socket.emit("send_invite", inviteData);
    setChat((prev) => [
      ...prev,
      {
        sender: "System",
        message: `Invite sent to ${trimmed}`,
        time: new Date().toLocaleTimeString(),
        system: true
      }
    ]);
    setInviteTarget("");
  };

  const deleteMessage = (indexToDelete) => {
    setChat((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const acceptInvite = () => {
    if (!pendingInvite) return;

    socket.emit("accept_invite", {
      room: pendingInvite.room,
      fromUser: pendingInvite.fromUser,
      toUser: displayName
    });
    setChat((prev) => [
      ...prev,
      {
        sender: "System",
        message: `You joined ${pendingInvite.room}`,
        time: new Date().toLocaleTimeString(),
        system: true
      }
    ]);
    setPendingInvite(null);
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
    inviteInput: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: "8px",
      border: "1px solid #d0d7de",
      boxSizing: "border-box",
      marginBottom: "6px",
      fontSize: "13px"
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
    systemMessage: {
      margin: "6px 0",
      padding: "8px 10px",
      borderRadius: "8px",
      background: "#eff6ff",
      color: "#1e3a8a"
    },
    meta: {
      color: "#64748b",
      fontSize: "12px"
    },
    messageHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px"
    },
    deleteButton: {
      border: "none",
      background: "transparent",
      color: "#b91c1c",
      cursor: "pointer",
      fontSize: "12px",
      padding: 0
    },
    inviteBox: {
      position: "absolute",
      top: "-12px",
      right: "12px",
      width: "300px",
      padding: "10px",
      borderRadius: "15px",
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)"
    },
    headerRow: {
      position: "relative",
      marginBottom: "12px"
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.headerRow}>
        <h1 style={{ marginTop: 0, marginRight: "260px" }}>Room: {room}</h1>
        <p style={{ color: "#475569", marginBottom: "0" }}>
          Signed in as <strong>{displayName}</strong> ({mode})
        </p>

        <div style={styles.inviteBox}>
          <input
            style={styles.inviteInput}
            value={inviteTarget}
            onChange={(e) => setInviteTarget(e.target.value)}
            placeholder="Invite by name"
          />
          <button style={{ ...styles.button, width: "100%", padding: "8px 10px" }} onClick={sendInvite}>
            Send Invite
          </button>
        </div>
      </div>

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

      {pendingInvite ? (
        <div style={{ ...styles.inviteBox, top: "120px", width: "240px" }}>
          <strong>{pendingInvite.fromUser}</strong> invited you to join <strong>{pendingInvite.room}</strong>.
          <div style={{ marginTop: "8px" }}>
            <button style={styles.button} onClick={acceptInvite}>Accept Invite</button>
          </div>
        </div>
      ) : null}

      <div>
        {chat.map((msg, i) => (
          <div key={i} style={msg.system ? styles.systemMessage : styles.message}>
            <div style={styles.messageHeader}>
              <div>
                <strong>{msg.sender || "System"}</strong>
                <span style={styles.meta}> · {msg.time}</span>
              </div>
              {!msg.system ? (
                <button style={styles.deleteButton} onClick={() => deleteMessage(i)}>
                  Delete
                </button>
              ) : null}
            </div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatPage;
