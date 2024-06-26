const { Model, DataTypes } = require("sequelize");

class Country extends Model {
  static associate(models) {
    const associationOneToMany = [
      "Escort",
      "CityLocalization",
      "EscortAccountVisibilityCountryLimit",
    ];

    associationOneToMany.forEach((association) => {
      Country.hasMany(models[association], {
        foreignKey: "country_short_code",
        sourceKey: "short_code",
      });
      models[association].belongsTo(Country, {
        foreignKey: "country_short_code",
        targetKey: "short_code",
      });
    });
  }
}

module.exports = (sequelize) => {
  Country.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      short_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
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
      modelName: "Country",
      underscored: true,
    }
  );

  return Country;
};
