const {
  Escort,
  Users,
  GenderLocalization,
  Country,
  Nationality,
  UserPackage,
  Package,
  EscortStories,
  EscortAboutMeLocalization,
  SexualOrientationLocalization,
  EscortPhysicalFeature,
  EyeColorLocalization,
  HairColorLocalization,
  HairLengthLocalization,
  BreastLocalization,
  PublicHairLocalization,
  EscortAvailability,
  IncallLocalization,
  OutcallLocalization,
  EscortVacation,
  EscortAdditionalInformation,
  EscortContactDetails,
  ContactInstructionLocalization,
  incallOutcallRates,
  EscortSocialMedia,
  ServiceOfferingCategory,
  EscortWorkingCity,
  EscortCityTour,
  EscortWorkingHour,
  EscortService,
} = require("../../../models");
const Joi = require("joi");
const { literal } = require("sequelize");

const detailsSchema = Joi.object({
  language: Joi.string(),
  username: Joi.string().required(),
});

const allDetails = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const username = req.query.username;
    const language = req.query.language || "EN";

    const user = await Users.findOne({
      where: { username },
      attributes: ["id"],

      include: [
        {
          model: Escort,
          attributes: [
            "name",
            "age",
            ["gender_combination_id", "genderCombinationId"],
            ["country_short_code", "countryShortCode"],
            "city",
            ["nationality_id", "nationalityId"],
            ["sexual_orientation_id", "sexualOrientationId"],
          ],
        },
      ],
    });

    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "User Does Not Exist" });
    // }

    // const userId = user.id;

    // try {

    //   const userPackage = await UserPackage.findOne({
    //     where: {
    //       user_id: userId,
    //       status: "1",
    //     },
    //     attributes: ["package_id"],
    //     order: [["createdAt", "DESC"]],
    //   });

    //   let packageData = "";

    //   if (userPackage) {
    //     packageData = await Package.findByPk(userPackage.package_id, {
    //       attributes: ["name"],
    //     });
    //   }

    //   const queryOptions = {
    //     attributes: [[literal("MAX(url)"), "latestUrl"]],
    //     where: {
    //       is_deleted: "0",
    //       ...(userId && { user_id: userId }),
    //     },
    //     group: ["user_id"],
    //     order: userId
    //       ? [[literal('MAX("EscortStories"."created_at")'), "DESC"]]
    //       : undefined,
    //     limit: userId ? 1 : undefined,
    //   };

    //   const stories = await EscortStories.findAll(queryOptions);

    //   const aboutMeData = await EscortAboutMeLocalization.findOne({
    //     where: { user_id: userId, language_code: language },
    //     attributes: ["content"],
    //   });

    //   const vacationData = await EscortVacation.findOne({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: ["from", "to"],
    //   });

    //   const contactData = await EscortContactDetails.findOne({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [
    //       ["contact_number", "contactNumber"],
    //       ["combination_id", "contactInstructionCombinationId"],
    //       ["address_club_name", "addressClubName"],
    //       ["address_street", "addressStreet"],
    //       ["address_nr", "addressNr"],
    //     ],
    //   });

    //   const contactInstructionData =
    //     await ContactInstructionLocalization.findOne({
    //       where: {
    //         language_code: language,
    //         combination_id:
    //           contactData.dataValues.contactInstructionCombinationId,
    //       },
    //       attributes: ["content"],
    //     });

    //   const incallOutcallRatesData = await incallOutcallRates.findOne({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [
    //       ["i_hour", "iHour"],
    //       ["i_additional_hour", "iAdditionalHour"],
    //       ["i_dinner_date", "iDinnerDate"],
    //       ["i_weekend", "iWeekend"],
    //       ["i_overnight", "iOvernight"],
    //       ["i_full_day", "iFullDay"],
    //       ["o_hour", "oHour"],
    //       ["o_additional_hour", "oAdditionalHour"],
    //       ["o_dinner_date", "oDinnerDate"],
    //       ["o_weekend", "oWeekend"],
    //       ["o_overnight", "oOvernight"],
    //       ["o_full_day", "oFullDay"],
    //     ],
    //   });

    //   const socialMediaData = await EscortSocialMedia.findAll({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [
    //       ["social_media_id", "socialMediaId"],
    //       ["social_media_username", "socialMediaUsername"],
    //     ],
    //   });

    //   const ServiceOfferingCategoryData = await ServiceOfferingCategory.findAll(
    //     {
    //       where: {
    //         user_id: userId,
    //       },
    //       attributes: [["offering_category_id", "offeringCategoryId"]],
    //     }
    //   );

    //   const workingCityData = await EscortWorkingCity.findAll({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [["combination_id", "combinationId"]],
    //   });

    //   const cityTourData = await EscortCityTour.findAll({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [
    //       ["combination_id", "combinationId"],
    //       "from",
    //       "to",
    //       ["contact_number", "contactNumber"],
    //       ["contact_email", "contactEmail"],
    //     ],
    //   });

    //   const workingHourData = await EscortWorkingHour.findAll({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [
    //       ["combination_id", "combinationId"],
    //       "from",
    //       "to",
    //       ["is_night_escort", "isNightEscort"],
    //     ],
    //   });

    //   const serviceData = await EscortService.findAll({
    //     where: {
    //       user_id: userId,
    //     },
    //     attributes: [["combination_id", "combinationId"], "rate"],
    //   });

    //   res.status(200).json({ data: socialMediaData });
    // } catch (error) {
    //   console.error("Error processing the data:", error);
    //   res
    //     .status(400)
    //     .json({ success: false, msg: "Get escort basic bio error" });
    // }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { allDetails };
