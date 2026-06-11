
// this page is for testing the account creation flow, it doesn't actually create accounts or connect to the backend, 
// it's just a demo page to show how the flow would work.
import React from "react";
import { createAccount } from "./accounts";

function NewMember({ onBack }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreate = () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const result = createAccount({ name, email, password });

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Account created successfully. You can now sign in as a member.");
    onBack();
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
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={{ marginTop: 0 }}>Create a Member Account</h1>
      <p style={{ color: "#475569", marginBottom: "16px" }}>
        This is the member sign-up page for testing the account flow.
      </p>

      <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <div style={styles.buttonRow}>
        <button style={styles.button} onClick={handleCreate}>Create Account</button>
        <button style={styles.secondaryButton} onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default NewMember;
