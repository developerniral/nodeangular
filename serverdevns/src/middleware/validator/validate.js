const { validationResult } = require('express-validator');


// utils/errorHandler.js
const { validationResult } = require('express-validator');

const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObject = {};
    errors.array().forEach(err => {
      if (!errorObject[err.param]) {
        errorObject[err.param] = [];
      }
      errorObject[err.param].push(err.msg);
    });
    return errorObject;
  }
  return null;
};

module.exports = { handleValidationErrors };