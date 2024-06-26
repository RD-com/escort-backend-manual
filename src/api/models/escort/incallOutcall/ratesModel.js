const { Model, DataTypes } = require("sequelize");

class incallOutcallRates extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  incallOutcallRates.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      i_hour: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      i_additional_hour: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      i_dinner_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      i_weekend: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      i_overnight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      i_full_day: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      o_hour: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      o_additional_hour: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      o_dinner_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      o_weekend: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      o_overnight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      o_full_day: {
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
      modelName: "incallOutcallRates",
      underscored: true,
    }
  );

  return incallOutcallRates;
};
