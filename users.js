let users = [];

//add user
function joinUser(socketId, userName, roomName) {
  const newUser = {
    socketId: socketId,
    userName: userName,
    roomName: roomName,
  };
  users.push(newUser);
  return newUser;
}

//delete user
function removeUser(id) {
  const getId = (users) => users.socketId === id;
  const index = users.findIndex(getId);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = { joinUser, removeUser };
