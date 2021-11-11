const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
var io = require("socket.io")(server);
const port = process.env.PORT || 3000;

var { joinUser } = require("./users");

//app setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app use
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

//index  route
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/chat", (req, res) => {
  res.render("chat");
});
//socket area
let thisRoom = "";
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join room", (data) => {
    let newUser = joinUser(socket.id, data.userName, data.room);
    socket.emit("send data", {
      id: socket.id,
      userName: newUser.userName,
      roomName: newUser.roomName,
    });
    thisRoom = newUser.roomName;
    socket.join(thisRoom);
  });

  socket.on("chat message", (data) => {
    io.to(data.room).emit("chat room", { data: data, id: socket.id });
  });
});

//server
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
