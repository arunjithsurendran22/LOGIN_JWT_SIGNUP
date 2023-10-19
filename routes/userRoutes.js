const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get('/',userController.frontPage)
router.get("/home", userController.home);
router.get("/login", userController.loginGet);
router.get("/signup", userController.signupGet);
router.get("/logout", userController.logout);
router.get("/profile", userController.profile);
router.post("/profile", userController.updateProfile);


module.exports=router