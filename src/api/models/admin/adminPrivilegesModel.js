const { Model, DataTypes } = require("sequelize");

class AdminPrivileges extends Model {
  static associate(models) {
    AdminPrivileges.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    AdminPrivileges.belongsTo(models.Privileges, {
      foreignKey: "privilege_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  AdminPrivileges.init(
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
      privilege_id: {
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
      modelName: "AdminPrivileges",
      underscored: true,
    }
  );

  return AdminPrivileges;
};
