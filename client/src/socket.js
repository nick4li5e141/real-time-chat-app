// Description: this file is responsible for establishing a connection to the socket server. 
// It uses the socket.io-client library to connect to the server at the specified URL. 
// The socket object is then exported for use in other parts of the application.

import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");
