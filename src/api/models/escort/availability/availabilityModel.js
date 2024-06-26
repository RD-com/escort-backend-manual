const { Model, DataTypes } = require("sequelize");

class EscortAvailability extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortAvailability.init(
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
      incall_combination_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      outcall_combination_id: {
        type: DataTypes.STRING,
        defaultValue: "",
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
      modelName: "EscortAvailability",
      underscored: true,
    }
  );

  return EscortAvailability;
};
