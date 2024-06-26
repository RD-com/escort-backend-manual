const { Model, DataTypes } = require("sequelize");

class LanguageProficiency extends Model {
  static associate(models) {
    LanguageProficiency.hasMany(models.EscortLanguage, {
      foreignKey: "proficiency_id",
      sourceKey: "id",
    });
    models.EscortLanguage.belongsTo(LanguageProficiency, {
      foreignKey: "proficiency_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  LanguageProficiency.init(
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
      modelName: "LanguageProficiency",
      underscored: true,
    }
  );

  return LanguageProficiency;
};
