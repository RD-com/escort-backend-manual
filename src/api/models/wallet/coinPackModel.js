const { Model, DataTypes } = require("sequelize");

class CoinPack extends Model {
  static associate(models) {
    //Coin Pack Offer
    CoinPack.hasOne(models.CoinPackOffer, {
      foreignKey: "coin_pack_id",
      sourceKey: "id",
    });
    models.CoinPackOffer.belongsTo(CoinPack, {
      foreignKey: "coin_pack_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  CoinPack.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      coin_amount: {
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
      modelName: "CoinPack",
      underscored: true,
    }
  );

  return CoinPack;
};
