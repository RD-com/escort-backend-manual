const { verifyAccount } = require("./accountVerifiedController");
const { approveDocument } = require("./documentVerifiedController");
const { approveGallery } = require("./galleryVerifiedController");
const { getUnverifiedAccounts } = require("./getUnverifiedAccountsController");
const { getUnverifiedDocument } = require("./getUnverifiedDocumentController");
const { approveSettings } = require("./settingsVerifiedController");
const { disableAccount } = require("./accountDisableController");
const { getDisabledAccounts } = require("./getDisabledAccountsController");

module.exports = {
  verifyAccount,
  approveDocument,
  approveGallery,
  getUnverifiedAccounts,
  getUnverifiedDocument,
  approveSettings,
  disableAccount,
  getDisabledAccounts,
};
