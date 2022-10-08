import Person from "/Person";
import { playerOnlineStatus } from "../enums/enums";

class Player extends Person {
  constructor(uid, nickName, isPlayerOne) {
    this.player = new Person(uid, nickName);
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
