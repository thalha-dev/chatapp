const express = require("express");
const app = express();
const server = require("http").Server(app);

app.use(express.static("public"));

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("socket", socket.id);
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`user left ${socket.id}`);
  });
});

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
