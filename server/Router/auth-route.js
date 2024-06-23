const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-controllers");
const {signupSchema,loginSchema} = require("../auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(auth.home);
router.route("/register").post(validate(signupSchema), auth.register);
router.route("/login").post(validate(loginSchema), auth.login);
router.route("/user").get(authMiddleware, auth.user);


module.exports = router;