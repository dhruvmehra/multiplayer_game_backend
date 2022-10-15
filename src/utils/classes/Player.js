const Person = require("./Person").Person;
const playerOnlineStatus = require("../enums/enums");

class Player extends Person {
  constructor(uid, nickName, isPlayerOne) {
    super(uid, nickName);
    this.isPlayerOne = isPlayerOne;
    this.isOnline = true;
  }

  setOnlineStatus(status) {
    //Make it public
    this.isOnline = status;
  }

  isPlayerOnline() {
    // Make it public
    return this.isOnline;
  }
}
module.exports.Player = Player;
