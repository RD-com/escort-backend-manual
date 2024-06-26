const { Model, DataTypes } = require("sequelize");

class EscortAccountVisibilityGenderLimit extends Model {}

module.exports = (sequelize) => {
  EscortAccountVisibilityGenderLimit.init(
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
      combination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "EscortAccountVisibilityGenderLimit",
      underscored: true,
    }
  );

  return EscortAccountVisibilityGenderLimit;
};
