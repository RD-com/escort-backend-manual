const { Model, DataTypes } = require("sequelize");

class EscortAboutMeLocalization extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortAboutMeLocalization.init(
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
      language_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
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
      modelName: "EscortAboutMeLocalization",
      underscored: true,
      uniqueKeys: {
        unique_user_language_code: {
          fields: ["user_id", "language_code"],
        },
      },
    }
  );

  return EscortAboutMeLocalization;
};
