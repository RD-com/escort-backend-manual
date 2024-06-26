const { Model, DataTypes } = require("sequelize");

class EscortLanguage extends Model {
  static associate(models) {
    EscortLanguage.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    EscortLanguage.belongsTo(models.Language, {
      foreignKey: "language_code",
      targetKey: "code",
    });
  }
}

module.exports = (sequelize) => {
  EscortLanguage.init(
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
      proficiency_id: {
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
      modelName: "EscortLanguage",
      underscored: true,
    }
  );

  return EscortLanguage;
};
