const logger = require('../../config/logger');
const { User } = require("../models")


const signup = async ({ name, email, password }) => {
    try{
    const isUserExists = await User.findOne({
        where: { email }
    })
    if (isUserExists) {
        return {
            status: "failure",
            error : "User already exists!"
        }
    }
    const response = await User.create({
        name,
        email,
        password
    })
    if(response.status == 200 || response.status == 201){
        return {
            status:"success",
            user : response.data
        }
    }
    } catch (err) {
       logger.error("Error in Signup",err)
    }
}

module.exports = {
    signup
}