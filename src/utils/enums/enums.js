const GameStatus = {
  Active: "Active",
  PlayerOneWon: "PlayerOneWon",
  PlayerTwoWon: "PlayerTwoWon",
  PlayerOneForfeit: "PlayerOneForfeit",
  PlayerTwoForfeit: "PlayerTwoForfeit",
};

const AccountStatus = {
  Active: "Active",
  Closed: "Closed",
  Blacklisted: "Blacklisted",
  Cancelled: "Cancelled",
  None: "None",
};

const playerOnlineStatus = {
  True: true,
  False: false,
};
module.exports = { GameStatus, AccountStatus, playerOnlineStatus };
