const { Model, DataTypes } = require("sequelize");

class Language extends Model {
  static associate(models) {
    const associationOneToMany = [
      "SexualOrientationLocalization",
      "GenderLocalization",
      "EyeColorLocalization",
      "HairColorLocalization",
      "HairLengthLocalization",
      "BreastLocalization",
      "PublicHairLocalization",
      "DecisionLocalization",
      "CityLocalization",
      "DayLocalization",
      "IncallLocalization",
      "OutcallLocalization",
      "ServiceLocalization",
      "ServiceTypeLocalization",
      "ServiceOfferingCategoryLocalization",
      "EscortAboutMeLocalization",
      "ContactInstructionLocalization",
      "EscortDocumentTypeLocalization",
      "FeatureLocalization",
      "CustomServiceLocalization",
      "LanguageProficiency",
    ];

    associationOneToMany.forEach((association) => {
      Language.hasMany(models[association], {
        foreignKey: "language_code",
        sourceKey: "code",
      });
      models[association].belongsTo(Language, {
        foreignKey: "language_code",
        targetKey: "code",
      });
    });

    //Escort
    Language.belongsToMany(models.Users, {
      through: models.EscortLanguage,
      foreignKey: "language_code",
      sourceKey: "code",
    });
    models.Users.belongsToMany(Language, {
      through: models.EscortLanguage,
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  Language.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
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
      modelName: "Language",
      underscored: true,
    }
  );

  return Language;
};
