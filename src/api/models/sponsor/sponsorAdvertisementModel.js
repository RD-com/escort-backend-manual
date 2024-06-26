const { Model, DataTypes } = require("sequelize");

class SponsorAdvertisement extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  SponsorAdvertisement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ad_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meta: {
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
      modelName: "SponsorAdvertisement",
      underscored: true,
    }
  );

  return SponsorAdvertisement;
};
