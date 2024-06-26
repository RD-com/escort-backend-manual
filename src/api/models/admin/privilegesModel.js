const { Model, DataTypes } = require("sequelize");

class Privileges extends Model {
  static associate(models) {
    //Admin Privileges
    Privileges.belongsToMany(models.Users, {
      through: models.AdminPrivileges,
      foreignKey: "privilege_id",
      sourceKey: "id",
    });
    models.Users.belongsToMany(Privileges, {
      through: models.AdminPrivileges,
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  Privileges.init(
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
      modelName: "Privileges",
      underscored: true,
    }
  );

  return Privileges;
};
