module.exports = (sequelize, DataTypes, Model) => {
  class Users extends Model {}

  Users.init(
    {
      // Model attributes are defined here
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailId: {
        type: DataTypes.STRING,
      },
      createdate: {
        type: DataTypes.DATE,
        // allowNull defaults to true
      },
      updateddate: {
        type: DataTypes.DATE,
        // allowNull defaults to true
      },
      createdby: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedby: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      location: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "users", // We need to choose the model name
    }
  );

  return Users;
};
