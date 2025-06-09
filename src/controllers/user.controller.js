const logger = require("../../config/logger");
const UserService = require("../services/user.services")
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        res.status(400).send("please provide all the required fields")
    }
    try {
        const result = await UserService.signup({ name, email, password });
        if (result?.status == "success") {
            logger.info(`User ${email} signed up Successfully!🎉🎉`)

            res.status(201).json({ message: "Signup Successful!" })
            return;
        } else {
            res.status(500).json({ error: result?.error })
        }

    } catch (err) {
        logger.error(`Error in Signup ${err}`)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("please provide all the required fields")
    }
    try {
        const result = await UserService.login({ email, password });
        if (result?.status == "success") {
            logger.info(`User ${email} logged in Successfully!🎉🎉`)
            res.status(201).json({ message: "Login Successful!" })
            return;
        } else {
            res.status(500).json({ error: result?.error })
        }

    } catch (err) {
        logger.error(`Error in Signup ${err}`)
    }
}

const resetPassword = async (req, res) => {
    const { password, email } = req.body;

    if (!password) {
        res.status(400).send("password is required!")
    }
    try {
        const response = await UserService.resetPassword({ password, email });
        if (response.status == "success") {
            logger.info("Password Reset successfull")
            res.status(200).json({ message: "password updated succesfully" })
        } else {
            res.status(500).json({ error: "Error in password reset" })
        }
    } catch (err) {
        logger.error("Error updating password",err)
    }
}

module.exports = {
    signup,
    login,
    resetPassword
}