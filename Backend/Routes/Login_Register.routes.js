const { Router } = require("express");
const router = Router();
const dotenv = require("dotenv");

const {
  Login_controller,
  Register_controller,
  Get_all_users,
} = require("../Controllers/Login.controller.js");

//configuratino for dotenv
dotenv.config({ path: "./.env" });

router.route("/login").post(Login_controller);
router.route("/register").post(Register_controller);
router.route("/get_all_users").get(Get_all_users);

module.exports = router;
