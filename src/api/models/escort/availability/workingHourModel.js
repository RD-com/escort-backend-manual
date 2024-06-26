const { Model, DataTypes } = require("sequelize");

class EscortWorkingHour extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortWorkingHour.init(
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
      from: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      to: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      is_night_escort: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "EscortWorkingHour",
      underscored: true,
      uniqueKeys: {
        unique_user_combination_id: {
          fields: ["user_id", "combination_id"],
        },
      },
    }
  );

  return EscortWorkingHour;
};
