const { Model, DataTypes } = require("sequelize");

class UserPackage extends Model {
  static associate(models) {
    UserPackage.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    UserPackage.belongsTo(models.Package, {
      foreignKey: "package_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  UserPackage.init(
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
      package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expire_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "1",
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
      modelName: "UserPackage",
      underscored: true,
    }
  );

  return UserPackage;
};
