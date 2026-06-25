import React from "react";

function SettingsPage({ theme = "light", onToggleTheme, onBack }) {
  const isDark = theme === "dark";
  const palette = isDark
    ? {
        card: "#111827",
        text: "#f9fafb",
        muted: "#cbd5e1",
        border: "#334155",
        button: "#60a5fa",
        buttonText: "#0f172a",
        secondaryBg: "#1f2937",
        secondaryText: "#f9fafb"
      }
    : {
        card: "#ffffff",
        text: "#0f172a",
        muted: "#475569",
        border: "#d0d7de",
        button: "#2563eb",
        buttonText: "#ffffff",
        secondaryBg: "#f8fafc",
        secondaryText: "#0f172a"
      };

  const styles = {
    card: {
      maxWidth: "420px",
      width: "100%",
      margin: "0 auto",
      padding: "24px",
      borderRadius: "16px",
      background: palette.card,
      color: palette.text,
      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.35)" : "0 10px 30px rgba(0,0,0,0.12)",
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
      background: palette.button,
      color: palette.buttonText,
      cursor: "pointer",
      fontWeight: 600
    },
    secondaryButton: {
      flex: "1 1 140px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: `1px solid ${palette.border}`,
      background: palette.secondaryBg,
      color: palette.secondaryText,
      cursor: "pointer",
      fontWeight: 600
    },
    label: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: `1px solid ${palette.border}`,
      marginBottom: "12px"
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      <p style={{ color: palette.muted, marginBottom: "16px" }}>
        Change the app appearance to match your preference.
      </p>

      <label style={styles.label}>
        <span>Dark mode</span>
        <input type="checkbox" checked={isDark} onChange={onToggleTheme} />
      </label>

      <div style={styles.buttonRow}>
        <button style={styles.button} onClick={onToggleTheme}>
          {isDark ? "Switch to light" : "Switch to dark"}
        </button>
        <button style={styles.secondaryButton} onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
