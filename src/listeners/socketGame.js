// import { DefaultTrack } from "../utils/track/DefaultTrack";
const io = require("socket.io")();

const socketGame = {
  io: io,
};

const createGame = (users) => {
  if (users.length >= 2) {
    playerOne = new Player(users.pop(), "Player 1", true);
    playerTwo = new Player(users.pop(), "Player 2", true);
    // track = new Track(DefaultTrack);
    game = new Game(playerOne, playerTwo, track);
    return game;
  }
};

let users = new Set([]);
let games = new Set([]);

// Socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected", socket.id);
  if (users.size > 0) {
    const [player] = users;
    users.delete[player];
    console.log("Users:", users);
    games.add(socket.id + "-" + player);
  } else {
    users.add(socket.id);
  }
  // console.log("Users:", users);
  console.log("Games:", games);

  socket.on("online", (data) => {
    users.add(data);
    // io.sockets.emit("join", data);
    while (users.size >= 2) {
      game = createGame(users);
      games.add(game);
      io.sockets.emit("game_started", game.name);
    }
  });
  socket.on("disconnect", (data) => {
    // Logic here
    console.log(socket.id);
    users.delete(socket.id);
  });
});
// end of socket.io logic

module.exports = socketGame;
