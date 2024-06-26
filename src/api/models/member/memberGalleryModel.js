const { Model, DataTypes } = require("sequelize");

class MemberGallery extends Model {
  static associate(models) {
    MemberGallery.belongsTo(models.EscortGallery, {
      foreignKey: "gallery_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  MemberGallery.init(
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
      gallery_id: {
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
      modelName: "MemberGallery",
      underscored: true,
    }
  );

  return MemberGallery;
};
