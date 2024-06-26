const { Model, DataTypes } = require("sequelize");

class EscortAccountVerificationDocs extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortAccountVerificationDocs.init(
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
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      combination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_approved: {
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
      modelName: "EscortAccountVerificationDocs",
      underscored: true,
    }
  );

  return EscortAccountVerificationDocs;
};
