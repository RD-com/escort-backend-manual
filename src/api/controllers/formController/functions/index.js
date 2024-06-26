const { gender } = require("./getGender");
const { packages } = require("./getPackages");
const { nationality } = require("./getNationality");
const { country } = require("./getCountry");
const { hairColor } = require("./getHairColor");
const { hairLength } = require("./getHairLength");
const { eyeColor } = require("./getEyeColor");
const { breast } = require("./getBreast");
const { publicHair } = require("./getPublicHair");
const { incall } = require("./getIncall");
const { outcall } = require("./getOutcall");
const { sexualOrientation } = require("./getSexualOrientation");
const { serviceOfferingCategory } = require("./getServiceOfferingCategory");
const { service } = require("./getService");
const { day } = require("./getDay");
const { contactInstruction } = require("./getContactInstruction");
const { socialMedia } = require("./getSocialMedia");
const { city } = require("./getCity");
const { language } = require("./getLanguage");
const { languageProficiency } = require("./getLanguageProficiency");

module.exports = {
  gender,
  packages,
  nationality,
  country,
  hairColor,
  hairLength,
  eyeColor,
  breast,
  publicHair,
  incall,
  outcall,
  sexualOrientation,
  serviceOfferingCategory,
  service,
  day,
  contactInstruction,
  socialMedia,
  city,
  language,
  languageProficiency,
};
