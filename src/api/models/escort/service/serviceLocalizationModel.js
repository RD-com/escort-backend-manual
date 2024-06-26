const { Model, DataTypes } = require("sequelize");

class ServiceLocalization extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  ServiceLocalization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      combination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // type_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
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
      modelName: "ServiceLocalization",
      underscored: true,
    }
  );

  return ServiceLocalization;
};
