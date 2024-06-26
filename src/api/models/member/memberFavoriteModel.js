const { Model, DataTypes } = require("sequelize");

class MemberFavorite extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  MemberFavorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      member_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      escort_id: {
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
      modelName: "MemberFavorite",
      underscored: true,
    }
  );

  return MemberFavorite;
};
