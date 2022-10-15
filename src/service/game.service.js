const gameRepository = require("../repository/game.repository");

class GameService {
  constructor() {}

  async getGames() {
    return await gameRepository.getGames();
  }

  async createGame(game) {
    return await gameRepository.createGame(game);
  }

  async updateGame(game) {
    return await gameRepository.updateGame(game);
  }

  async deleteGame(gameId) {
    return await gameRepository.deleteGame(gameId);
  }
}

module.exports = new GameService();
