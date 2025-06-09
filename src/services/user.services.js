const logger = require('../../config/logger');
const { User } = require("../models")

// sign up new user
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

// login already present user
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
        // used custom validPassword function in user model to handle password checks
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

// reset password for user
const resetPassword = async({email,password})=>{
  try {
    const user = await User.findOne({
        where:{email}
    })

    if(!user){
        return {
          status : "failure",
          error : "this user doesn't exists"
        }
    }

    user.password = password;
    await user.save();

    return {
        status : "success",
        data : user
    }
   
  } catch(err){
    logger.error("Error in Reset password", err)
  }
}
    module.exports = {
        signup,
        login,
        resetPassword
    }