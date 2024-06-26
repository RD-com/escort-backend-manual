const { Model, DataTypes } = require("sequelize");

class EscortSocialMedia extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortSocialMedia.init(
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
      social_media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      social_media_username: {
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
      modelName: "EscortSocialMedia",
      underscored: true,
      uniqueKeys: {
        unique_user_social_media: {
          fields: ["user_id", "social_media_id"],
        },
      },
    }
  );

  return EscortSocialMedia;
};
