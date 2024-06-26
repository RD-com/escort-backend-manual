const { Model, DataTypes } = require("sequelize");

class EscortGallery extends Model {
  static associate(models) {
    //Gallery Media
    EscortGallery.hasMany(models.EscortGalleryMedia, {
      foreignKey: "gallery_id",
      sourceKey: "id",
    });
    models.EscortGalleryMedia.belongsTo(EscortGallery, {
      foreignKey: "gallery_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  EscortGallery.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM("1", "2"),
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
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
      modelName: "EscortGallery",
      underscored: true,
    }
  );

  return EscortGallery;
};
