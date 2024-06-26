const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static associate(models) {
    const associationsOneToOne1 = [
      "Member",
      "Escort",
      "EscortPhysicalFeature",
      "EscortAdditionalInformation",
      "EscortAvailability",
      "EscortVacation",
      "EscortAccountVisibilityAgeLimit",
      "Wallet",
      "ApprovalStatus",
    ];

    associationsOneToOne1.forEach((association) => {
      Users.hasOne(models[association], {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models[association].belongsTo(Users, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    });

    const associationsOneToMany1 = [
      "Ticket",
      "EscortWorkingHour",
      "EscortStories",
      "EscortAccountVisibilityCountryLimit",
      "incallOutcallRates",
      "EscortAccountVisibilityGenderLimit",
      "EscortStatics",
      "EscortCityTour",
      "EscortAccountVerificationDocs",
      "EscortSocialMedia",
      "EscortGallery",
      "EscortContactDetails",
      "EscortAboutMeLocalization",
      "EscortWorkingCity",
      "EscortService",
      "EscortCustomService",
      "ServiceOfferingCategory",
      "Limitation",
      "EscortSocialContact",
    ];

    associationsOneToMany1.forEach((association) => {
      Users.hasMany(models[association], {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models[association].belongsTo(Users, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    });

    const associationOneToMany2 = ["MemberFavorite", "Appointment"];

    associationOneToMany2.forEach((association) => {
      Users.hasMany(models[association], {
        foreignKey: "member_id",
        sourceKey: "id",
      });
      models[association].belongsTo(Users, {
        foreignKey: "member_id",
        targetKey: "id",
      });
    });

    const associationOneToMany3 = ["MemberFavorite", "Appointment"];

    associationOneToMany3.forEach((association) => {
      Users.hasMany(models[association], {
        foreignKey: "escort_id",
        sourceKey: "id",
      });
      models[association].belongsTo(Users, {
        foreignKey: "escort_id",
        targetKey: "id",
      });
    });

    //Chat sender
    Users.hasMany(models.Chat, {
      foreignKey: "sender",
      sourceKey: "id",
    });
    models.Chat.belongsTo(Users, {
      foreignKey: "sender",
      targetKey: "id",
    });

    //Chat receiver
    Users.hasMany(models.Chat, {
      foreignKey: "receiver",
      sourceKey: "id",
    });
    models.Chat.belongsTo(Users, {
      foreignKey: "receiver",
      targetKey: "id",
    });

    //Chat Deleted Member One
    Users.hasMany(models.Chat, {
      foreignKey: "deleted_member_one",
      sourceKey: "id",
    });
    models.Chat.belongsTo(Users, {
      foreignKey: "deleted_member_one",
      targetKey: "id",
    });

    //Chat Deleted Member Two
    Users.hasMany(models.Chat, {
      foreignKey: "deleted_member_two",
      sourceKey: "id",
    });
    models.Chat.belongsTo(Users, {
      foreignKey: "deleted_member_two",
      targetKey: "id",
    });

    //User Packages
    Users.hasMany(models.UserPackage, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
    models.UserPackage.belongsTo(Users, {
      foreignKey: "user_id",
      targetKey: "id",
    });

    // Users.belongsToMany(models.Language, { through: models.EscortLanguage });
  }
}

module.exports = (sequelize) => {
  Users.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      otp_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      otp_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      login_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      account_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_approved_affiliate: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
      is_email_verified: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
      is_account_verified: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
      is_disabled: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
      is_suspended: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
      current_step: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/",
      },
      pro_pic: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "default url",
      },
      ref_id: {
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
      modelName: "Users",
      underscored: true,
    }
  );

  return Users;
};
