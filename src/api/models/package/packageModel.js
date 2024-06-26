const { Model, DataTypes } = require("sequelize");

class Package extends Model {
  static associate(models) {
    const associations1n = ["Pricing", "PackageFeature"];

    associations1n.forEach((association) => {
      Package.hasMany(models[association], {
        foreignKey: "package_id",
        sourceKey: "id",
      });
      models[association].belongsTo(Package, {
        foreignKey: "package_id",
        targetKey: "id",
      });
    });

    //Users
    Package.belongsToMany(models.Users, {
      through: models.UserPackage,
      foreignKey: "package_id",
      sourceKey: "id",
    });
    models.Users.belongsToMany(Package, {
      through: models.UserPackage,
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  Package.init(
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
      modelName: "Package",
      underscored: true,
    }
  );

  return Package;
};
