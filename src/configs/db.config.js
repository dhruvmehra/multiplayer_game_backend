const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require("../logger/api.logger");

const connect = () => {
  const hostName = process.env.HOST;
  const userName = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const database = process.env.DB;
  const dialect = process.env.DIALECT;
  const psqlport = process.env.PSQLPORT;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    port: psqlport,
    dialect: dialect,
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.users = require("../models/user.model")(sequelize, DataTypes, Model);
  db.games = require("../models/game.model")(sequelize, DataTypes, Model);

  return db;
};

module.exports = {
  connect,
};
