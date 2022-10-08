import { GameStatus } from "../enums/enums";

class Game {
  constructor(playerOne, playerTwo, track) {
    this.dateCreated = new Date().toISOString();
    this.name = playerOne + "_" + playerTwo;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOnePos = 0;
    this.playerTwoPos = 0;
    this.status = GameStatus.Active;
    this.track = track;
  }

  getPlayerOnePos() {
    // Make it public
    return this.playerOnePos;
  }

  getPlayerTwoPos() {
    // Make it public
    return this.playerTwoPos;
  }

  setPlayerOnePos(pos) {
    // Make it public
    this.playerOnePos = pos;
  }

  setPlayerTwoPos(pos) {
    // Make it public
    this.playerTwoPos = pos;
  }

  setGameStatus(gameStatus){
    // Make it public
    if (this.playerOnePos >= this.track.lenght) {
       this.status = GameStatus.PlayerOneWon;
    }
    else if (this.playerTwoPos >= this.track.lenght) {
        this.status = GameStatus.PlayerTwoWon;
    }
    else if (this.playerOne.isPlayerOnline() === false){
        this.status = GameStatus.PlayerTwoWon;
    }
    else if (this.playerTwo.isPlayerOnline() === false){
        this.status = GameStatus.PlayerOneWon;
    }
  }

  getIsGameOver() {
    // Make it public
    if status !== GameStatus.Active {
        return true
    }
    else {
        return false
    }
    
  }

  getWhoWon() {
    // Make it public
    if getIsGameOver() {
        if (this.status === GameStatus.PlayerOneWon){
            return this.playerOne;
        }
        else {
            return this.playerTwo;
        }
    }
    
  }
}
