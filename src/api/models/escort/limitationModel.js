const { Model, DataTypes } = require("sequelize");

class Limitation extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  Limitation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("1"),
        allowNull: false,
      },
      is_exceeded: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
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
      modelName: "Limitation",
      underscored: true,
    }
  );

  return Limitation;
};
