const { Model, DataTypes } = require("sequelize");

class EscortAccountVisibilityCountryLimit extends Model {}

module.exports = (sequelize) => {
  EscortAccountVisibilityCountryLimit.init(
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
      country_short_code: {
        type: DataTypes.STRING,
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
      modelName: "EscortAccountVisibilityCountryLimit",
      underscored: true,
    }
  );

  return EscortAccountVisibilityCountryLimit;
};
