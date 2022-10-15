const { connect } = require("../configs/db.config");
const logger = require("../logger/api.logger");

class GameRepository {
  db = {};

  constructor() {
    this.db = connect();
    // For Development
    this.db.sequelize.sync().then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  async getGames() {
    try {
      const games = await this.db.games.findAll();
      console.log("games:::", games);
      return games;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createGame(game) {
    let data = {};
    try {
      game.createdate = new Date().toISOString();
      data = await this.db.games.create(game);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateGame(game) {
    let data = {};
    try {
      game.updateddate = new Date().toISOString();
      data = await this.db.games.update(
        { ...game },
        {
          where: {
            id: game.id,
          },
        }
      );
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteGame(gameId) {
    let data = {};
    try {
      data = await this.db.games.destroy({
        where: {
          id: gameId,
        },
      });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new GameRepository();
