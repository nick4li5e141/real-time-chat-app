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

import { useState } from "react";
import { socket } from "./socket";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import NewMember from "./NewMember";
import MemberLoginPage from "./MemberLoginPage";

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);

  const handleEnter = ({ name, room, mode }) => {
    socket.emit("join_room", room);
    setUser({ name, room, mode });
    setScreen("chat");
  };

  const handleBack = () => {
    setScreen("login");
  };

  const handleMemberClick = () => {
    setScreen("newMember");
  };

  const handleMemberLoginClick = () => {
    setScreen("memberLogin");
  };

  const handleMemberRoomEnter = ({ name, room, mode }) => {
    socket.emit("join_room", room);
    setUser({ name, room, mode });
    setScreen("chat");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eff6ff, #f8fafc)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      {screen === "login" ? (
        <LoginPage
          onEnter={handleEnter}
          onMemberClick={handleMemberClick}
          onMemberLoginClick={handleMemberLoginClick}
        />
      ) : screen === "newMember" ? (
        <NewMember onBack={handleBack} />
      ) : screen === "memberLogin" ? (
        <MemberLoginPage onBack={handleBack} onEnterRoom={handleMemberRoomEnter} />
      ) : (
        <ChatPage
          displayName={user.name}
          mode={user.mode}
          room={user.room}
          onBack={handleBack}
          socket={socket}
        />
      )}
    </div>
  );
}

export default App;