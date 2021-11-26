const { validationResult } = require('express-validator');

//const validationResult = expressValidator.validationResult;

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    return next();
  }
  //console.log("errors message[0]: ", errors.array()[0].msg);
  return res.status(400).json({ message: errors.array()[0].msg });  
}

module.exports = validate;