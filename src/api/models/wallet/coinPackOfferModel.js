const { Model, DataTypes } = require("sequelize");

class CoinPackOffer extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  CoinPackOffer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      coin_pack_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      offer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "CoinPackOffer",
      underscored: true,
    }
  );

  return CoinPackOffer;
};
