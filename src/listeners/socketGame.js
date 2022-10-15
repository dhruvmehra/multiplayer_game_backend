const Player = require("../utils/classes/Player").Player;
const Game = require("../utils/classes/Game").Game;
const Track = require("../utils/classes/Track").Track;
const defaultTrack = require("../utils/track/DefaultTrack").track;
const io = require("socket.io")();

const socketGame = {
  io: io,
};

let players_list = new Set([]);
let players_in_game = new Set([]);
let games_prep = {};
let games_started = {};

const createGame = (playerOneId, playerTwoId) => {
  playerOne = new Player(playerOneId, "Player 1", (isPlayerOne = true));
  playerTwo = new Player(playerTwoId, "Player 2", (isPlayerOne = false));
  game_track = new Track(defaultTrack());
  // Create game
  game = new Game(playerOne, playerTwo, game_track);
  console.log(game_track);
  // Add players to a block list
  players_in_game.add(playerOneId);
  players_in_game.add(playerTwoId);
  return game;
};

const AddPlayerToGame = (playerID, socket) => {
  if (
    players_list.size > 0 &&
    !players_list.has(playerID) &&
    !players_in_game.has(playerID)
  ) {
    const [playerTwo] = players_list;
    players_list.delete(playerTwo);
    game = createGame(playerID, playerTwo);

    // add players to the room
    roomId = playerID + "_" + playerTwo;

    // Adding game to the games list about to kick off
    games_prep[roomId] = game;
    console.log("This Game list:", games_prep);

    // Emit game ids to players
    socket.emit(playerTwo, {
      msg: "game created",
      gameIdentifier: roomId,
      gameTrack: game.track,
      player: "P2"
    });
    socket.emit(playerID, {
      gamelabel: "game created",
      gameIdentifier: roomId,
      gameTrack: game.track,
      player: "P1"
    });
  } else if (!players_in_game.has(playerID)) {
    players_list.add(playerID);
  }
};

// Socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected", socket.id);

  // Socket to handle game creation and adding it to a queue
  socket.on("add player", (data) => {
    // example
    // data = {
    //   playerAuthId,
    // }
    AddPlayerToGame(data.playerAuthId, socket);
    console.log("User list:", players_list);
  });

  // Socket to handle game started
  socket.on("game started", (data) => {
    // data = {
    //   gameId,
    //   playerAuthId,
    // };
    games_started[data.gameId] = games_prep[data.gameId];
    delete games_prep[data.gameId];
  });

  // Socket to handle cases when a player abandons
  socket.on("player abandoned", (data) => {
    // data = {
    //   gameId,
    //   playerAuthId,
    // };
    gameTobeDeleted = games_prep[data.gameId];
    playerOneId = gameTobeDeleted.playerOne.uid;
    playerTwoId = gameTobeDeleted.playerTwo.uid;

    if (data.playerAuthId === playerOneId) {
      playerStillPlaying = playerTwoId;
    } else {
      playerStillPlaying = playerOneId;
    }

    // Delete the abandoned game
    delete games_prep[data.gameId];

    // Add the online player to the user/game queue
    AddPlayerToGame(playerStillPlaying, socket);
  });

  // Logic for score sharing
  socket.on("update score", (data) => {
    // data = {
      // gameId,
      // player1 or 2
      // pos
      game = games_started[data.gameId]
      if (data.player === "P1"){
        game.setPlayerOnePos(data.pos);
      }
      else if(data.player === "P2"){
        game.setPlayerTwoPos(data.pos);
      }
      
      // check if game over
      if (game.getIsGameOver()){
        winner = game.getWhoWon();
        socket.emit(gameId, {"msg": "game over", "P1pos": Null, "P1pos": Null, "winner": winner});
      }

      socket.emit(gameId, {"msg": "game ongoing", "P1pos": game.playerOnePos, "P2pos": game.playerTwoPos, "winner": Null});
    }
  // Adding logic for connect
  socket.on("disconnect", () => {
    // Logic here
    console.log("A User left:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});
// end of socket.io logic

module.exports = socketGame;
