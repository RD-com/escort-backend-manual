const { Model, DataTypes } = require("sequelize");

class EscortContactDetails extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  EscortContactDetails.init(
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
      contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      combination_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address_club_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_nr: {
        type: DataTypes.STRING,
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
      modelName: "EscortContactDetails",
      underscored: true,
    }
  );

  return EscortContactDetails;
};
