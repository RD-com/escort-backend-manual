const { Model, DataTypes } = require("sequelize");

class Wallet extends Model {
  static associate(models) {
    //Transaction
    Wallet.hasMany(models.Transaction, {
      foreignKey: "wallet_id",
      sourceKey: "id",
    });
    models.Transaction.belongsTo(Wallet, {
      foreignKey: "wallet_id",
      targetKey: "id",
    });
  }
}

module.exports = (sequelize) => {
  Wallet.init(
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
      total_amount: {
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
      modelName: "Wallet",
      underscored: true,
    }
  );

  return Wallet;
};
