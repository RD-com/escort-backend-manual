const { Model, DataTypes } = require("sequelize");

class UserAccountType extends Model {
  static associate(models) {
    //Users
    UserAccountType.hasMany(models.Users, {
      foreignKey: "account_type_id",
      sourceKey: "id",
    });
    models.Users.belongsTo(UserAccountType, {
      foreignKey: "account_type_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  UserAccountType.init(
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
      modelName: "UserAccountType",
      underscored: true,
    }
  );

  return UserAccountType;
};
