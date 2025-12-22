const { body } = require("express-validator");
const db = require("../db/queries");

const emptyMsg = "is required";
const length = "should be between 1 and 50 characters";
const boolean = "has to be a true or false value";

exports.signupValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("username " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("email " + length)
    .isEmail()
    .withMessage("email is not valid")
    .custom(async (value) => {
      const user = await db.getUser("email", value);
      if (user) throw new Error("Email already exists");
      else return true;
    }),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length)
    .custom(async (value) => {
      const user = await db.getUser("username", value);
      if (user) throw new Error("Username already exists");
      else return true;
    }),
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("first name " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("first name " + length)
    .isAlpha()
    .withMessage("first name must be alphabetic characters only"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("last name " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("last name " + length)
    .isAlpha()
    .withMessage("last name must be alphabetic characters only"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("password confirmation " + emptyMsg)
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Passwords do not match");
      else return true;
    }),
];

exports.signinValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length),
];

exports.postValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Post content cannot be empty")
    .isLength({ min: 1, max: 280 })
    .withMessage("Post content should be between 1 and 280 characters"),
];
