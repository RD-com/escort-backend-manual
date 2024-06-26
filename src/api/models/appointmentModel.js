const { Model, DataTypes } = require("sequelize");

class Appointment extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      member_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      escort_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      approval_status: {
        type: DataTypes.ENUM("0", "1", "2", "3"),
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
      modelName: "Appointment",
      underscored: true,
    }
  );

  return Appointment;
};
