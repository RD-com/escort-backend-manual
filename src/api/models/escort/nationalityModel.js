const { Model, DataTypes } = require("sequelize");

class Nationality extends Model {
  static associate(models) {
    //Escort
    Nationality.hasMany(models.Escort, {
      foreignKey: "nationality_id",
      sourceKey: "id",
    });
    models.Escort.belongsTo(Nationality, {
      foreignKey: "nationality_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  Nationality.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      modelName: "Nationality",
      underscored: true,
    }
  );

  return Nationality;
};
