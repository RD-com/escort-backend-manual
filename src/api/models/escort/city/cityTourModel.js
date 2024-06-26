const { Model, DataTypes } = require("sequelize");

class EscortCityTour extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortCityTour.init(
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      to: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_email: {
        type: DataTypes.STRING,
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
      modelName: "EscortCityTour",
      underscored: true,
    }
  );

  return EscortCityTour;
};
