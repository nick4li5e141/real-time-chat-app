import { useState } from "react";
import { socket } from "./socket";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import NewMember from "./NewMember";
import MemberLoginPage from "./MemberLoginPage";
import SettingsPage from "./SettingsPage";

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const handleEnter = ({ name, room, mode }) => {
    socket.emit("join_room", { room, name });
    setUser({ name, room, mode });
    setScreen("chat");
  };

  const handleBack = () => {
    if (user?.mode === "member") {
      setScreen("memberLogin");
      return;
    }

    setScreen("login");
  };

  const handleSignOut = () => {
    setUser(null);
    setScreen("login");
  };

  const handleMemberClick = () => {
    setScreen("newMember");
  };

  const handleMemberLoginClick = () => {
    setScreen("memberLogin");
  };

  const handleSettingsClick = () => {
    setScreen("settings");
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleMemberRoomEnter = ({ name, room, mode }) => {
    socket.emit("join_room", { room, name });
    setUser({ name, room, mode });
    setScreen("chat");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme === "dark" ? "linear-gradient(135deg, #020617, #111827)" : "linear-gradient(135deg, #eff6ff, #f8fafc)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      {screen === "login" ? (
        // if the user is on the login screen, show the login page
        <LoginPage
          onEnter={handleEnter}
          onMemberClick={handleMemberClick}
          onMemberLoginClick={handleMemberLoginClick}
          onSettingsClick={handleSettingsClick}
          theme={theme}
        />
        // if the user is on the login screen, show the login page
      ) : screen === "newMember" ? (
        // if the user clicks the "I'm a member" button, show the member login page
        <NewMember onBack={handleBack} />
      ) : screen === "settings" ? (
        <SettingsPage theme={theme} onToggleTheme={handleThemeToggle} onBack={handleBack} />
      ) : screen === "memberLogin" ? (
        // if the user clicks the "Create an account" button, show the new member page
        <MemberLoginPage
          onBack={handleBack}
          onSignOut={handleSignOut}
          onEnterRoom={handleMemberRoomEnter}
          initialLoggedIn={user?.mode === "member"}
          initialMemberAccount={user}
          theme={theme}
        />
      ) : (
        // if the user is logged in, show the chat page
        <ChatPage
          displayName={user.name}
          mode={user.mode}
          room={user.room}
          onBack={handleBack}
          socket={socket}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;