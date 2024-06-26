const { Model, DataTypes } = require("sequelize");

class EscortGalleryMedia extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortGalleryMedia.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      gallery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      media_type: {
        type: DataTypes.ENUM("1", "2"),
        allowNull: false,
        defaultValue: "1",
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
      modelName: "EscortGalleryMedia",
      underscored: true,
    }
  );

  return EscortGalleryMedia;
};
