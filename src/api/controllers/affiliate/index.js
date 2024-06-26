const { get } = require("./getUsernameController");
const { referrals } = require("./refController");
const { users } = require("./getAffiliateController");
const { income } = require("./getAffiliateIncomeController");

module.exports = { get, referrals, users, income };
