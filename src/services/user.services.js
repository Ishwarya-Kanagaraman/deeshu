const logger = require('../../config/logger');
const { User } = require("../models")


const signup = async ({ name, email, password }) => {
    try {
        const isUserExists = await User.findOne({
            where: { email }
        })
        if (isUserExists) {
            return {
                status: "failure",
                error: "User already exists!"
            }
        }
        const response = await User.create({
            name,
            email,
            password
        })
        if (response.status == 200 || response.status == 201) {
            return {
                status: "success",
                user: response.data
            }
        }
    } catch (err) {
        logger.error("Error in Signup", err)
    }
}

const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({
            where: { email }
        })
        if (!user) {
            return {
                status: "failure",
                error: "please register the user!"
            }
        }
        const isLoggedin = await user.isValidPassword(password)

        if (isLoggedin) {
            return {
                status: "success",
            }
        } else {
            return {
                status: "failure",
                error: "Invalid credentials"
            }
        }
    } catch (err) {
        logger.error("Error in Login", err)
    }
}

module.exports = {
    signup,
    login
}