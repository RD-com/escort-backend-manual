const { Model, DataTypes } = require("sequelize");

class EscortAccountVisibilityAgeLimit extends Model {}

module.exports = (sequelize) => {
  EscortAccountVisibilityAgeLimit.init(
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
      min_age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_age: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "EscortAccountVisibilityAgeLimit",
      underscored: true,
    }
  );

  return EscortAccountVisibilityAgeLimit;
};
