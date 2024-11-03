//1 Import packages
import { Socket } from "dgram";
import express from "express";

import http from "http";

import { Server } from "socket.io";

//2 Create instances and make server

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//3 Serve static files

app.use(express.static("public"));

//4 create connection
io.on("connection", (socket) => {
  console.log("User connected successfully");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//6 Run server

server.listen(3001, () => {
  console.log("Listening to 3001 port");
});
