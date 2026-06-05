// Description: this file is the entry point of the chat application. It renders the App component, which is the main component of the application.
// THIS PAGE WOULD MOUNT THE APP COMPONENT TO THE DOM. IT IS THE STARTING POINT OF THE APPLICATION.

// THIS FILE WOULD ALSO IMPORT ANY NECESSARY STYLES OR OTHER ASSETS NEEDED FOR THE APPLICATION TO FUNCTION PROPERLY.


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
