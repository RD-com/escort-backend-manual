const { Model, DataTypes } = require("sequelize");

class Pricing extends Model {}

module.exports = (sequelize) => {
  Pricing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time_period: {
        type: DataTypes.ENUM("1", "2", "3", "4", "0"),
        allowNull: false,
        defaultValue: "3",
      },
      price: {
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
      modelName: "Pricing",
      underscored: true,
    }
  );

  return Pricing;
};
