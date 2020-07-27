const injector = require("../services/request_injector");

const router = require("express").Router();
const getController = require("../controllers/registerController");
const testVerifyToken = require("../controllers/test");
const passwordReset = require("../controllers/resetPassword");
const editProfile = require("../controllers/editProfile");
const editUsername = require("../controllers/editUsername");
const deleteUser = require("../controllers/deleteUser");
const confirmU = require('../controllers/registerController')


//get the route
router.post("/register-user", injector(getController.registerUser));
router.post("/login", injector(getController.loginUser));
router.get("/get-register-user", injector(getController.getRegisteruser));
router.post("/verify-token", injector(testVerifyToken.tokenVerify));
router.post("/password-reset", injector(passwordReset.resetPassword));
router.post("/edit-user-profile", injector(editProfile.editUserProfile));
router.post("/edit-username", injector(editUsername.editUsername));
router.post("/delete-user", injector(deleteUser.deleteUserDetails));
router.post('/confirmation/:token' , injector(confirmU.confirmation))
module.exports = router;
