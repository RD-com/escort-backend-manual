const { Model, DataTypes } = require("sequelize");

class ServiceOfferingCategory extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  ServiceOfferingCategory.init(
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
      offering_category_id: {
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
      modelName: "ServiceOfferingCategory",
      underscored: true,
    }
  );

  return ServiceOfferingCategory;
};
