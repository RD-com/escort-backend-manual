const { Model, DataTypes } = require("sequelize");

class EscortAdditionalInformation extends Model {}

module.exports = (sequelize) => {
  EscortAdditionalInformation.init(
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
      is_smoking: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_drinking: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_tatoos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_piercing: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      special_characteristics: {
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
      modelName: "EscortAdditionalInformation",
      underscored: true,
    }
  );

  return EscortAdditionalInformation;
};
