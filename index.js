const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("client"));
const httpServer = require("http").createServer();

app.get("/", (req, res) => {
  res.sendFile(path.resolve("client", "index.html"));
});

const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App is running at http://localhost:${port}`);
// });
const server = app.listen(port, () => {
  console.log("Listening on port: " + port);
});
const io = require("socket.io")(server);

//node server that is responsible for handlinging socket.io connections
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

const users = {};
io.on("connection", (socket) => {
  socket.on("new-user-joined", (usernm) => {
    console.log("New User", usernm);
    users[socket.id] = usernm;
    socket.broadcast.emit("user-joined", usernm);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      usernm: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
