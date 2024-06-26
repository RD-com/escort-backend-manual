const validator = require("validator");

const sanitizeInput = (input) => {
  // let sanitizedInput = validator.stripTags(input);
  let sanitizedInput = validator.escape(input);
  sanitizedInput = validator.blacklist(sanitizedInput, "\x00-\x1F\x7F");

  return sanitizedInput;
};

module.exports = { sanitizeInput };
