//1 packages

import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

//2 Instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//3 Serving html
const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname); ///home/sahy/Tutorials/Socket/dailydevsocket

app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

//4 Define a connection event handler
io.on("connection", (client) => {
  console.log("User connected to (server)");

  //Emit a 'message' event to the client
  client.emit("message", "Message from the server");

  //Listen to the 'new message' event
  client.on("new message", (message) => {
    console.log(message);
  });

  //Handle disconnection
  client.on("disconnect", () => {
    console.log("Client Disconnected from the server");
  });
});

//5 Start the server

const PORT = 3000;

server.listen(PORT, () => console.log("Server listening 3000"));
