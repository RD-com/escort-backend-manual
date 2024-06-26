const { Model, DataTypes } = require("sequelize");

class Chat extends Model {}

module.exports = (sequelize) => {
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiver: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      read_receipt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      room: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deleted_member_one: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      deleted_member_two: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    },
    {
      sequelize,
      modelName: "Chat",
      underscored: true,
    }
  );

  return Chat;
};
