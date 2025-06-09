const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller")

router.get("/", (req, res) => {
    res.send("Users route hit")
})
router.post("/signup", userController.signup);

router.post("/login", userController.login)

module.exports = router