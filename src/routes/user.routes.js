const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller")

// POST request for Signup
router.post("/signup", userController.signup);

// POST request for Login
router.post("/login", userController.login)

// PUT request for reset password
router.put("/resetPassword",userController.resetPassword)

module.exports = router