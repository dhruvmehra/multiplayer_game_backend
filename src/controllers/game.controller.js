const gameService = require("../service/game.service");
const logger = require("../logger/api.logger");

class GameController {
  async getGames() {
    logger.info("Controller: getGames");
    return await gameService.getGames();
  }

  async createGame(game) {
    logger.info("Controller: createGame", game);
    return await gameService.createGame(game);
  }

  async updateGame(game) {
    logger.info("Controller: updateGame", game);
    return await gameService.updateGame(game);
  }

  async deleteGame(game) {
    logger.info("Controller: deleteGame", gameId);
    return await gameService.deleteGame(gameId);
  }
}
module.exports = new GameController();
