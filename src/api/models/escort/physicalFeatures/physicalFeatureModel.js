const { Model, DataTypes } = require("sequelize");

class EscortPhysicalFeature extends Model {}

module.exports = (sequelize) => {
  EscortPhysicalFeature.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      eye_color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hair_color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hair_length_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dress_size: {
        type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "XXL"),
        allowNull: true,
      },
      shoe_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bust: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      waist: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hip: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cup_size: {
        type: DataTypes.ENUM(
          "A",
          "B",
          "C",
          "D",
          "DD",
          "F",
          "FF",
          "G",
          "H",
          "J"
        ),
        allowNull: true,
      },
      breast_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      public_hair_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "EscortPhysicalFeature",
      underscored: true,
    }
  );

  return EscortPhysicalFeature;
};
