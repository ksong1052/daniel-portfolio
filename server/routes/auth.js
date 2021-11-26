const router = require("express").Router();
require('express-async-errors');
const { body } = require('express-validator');
const validate = require('../middleware/validator');

const authController = require('../costroller/auth');

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .isLength({min:5})
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1
    })
    .withMessage('"Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"'),
  validate
];

const validateSignup = [
  ...validateCredential,
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('invalid email'),  
  validate
];

// Register
router.post("/register", validateSignup, authController.register);

// login
router.post("/login", validateCredential, authController.login);

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

module.exports = router;