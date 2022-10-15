module.exports = (sequelize, DataTypes, Model) => {
  class Games extends Model {}

  Games.init(
    {
      // Model attributes are defined here
      gameId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdate: {
        type: DataTypes.DATE,
        // allowNull defaults to true
      },
      updateddate: {
        type: DataTypes.DATE,
        // allowNull defaults to true
      },
      player1: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      player2: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      winner: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      tournament: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "games", // We need to choose the model name
    }
  );

  return Games;
};
