const UserService = require("../services/user.services")
const signup = async(req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        res.status(400).send("please provide all the required fields")
    }
    try {
        const result = await UserService.signup({ name, email, password });
        if (result?.status == "success") {
            res.status(201).json({ message: "Signup Successful!" })
            return;
        } else {
            res.status(500).json({ error: result.error })
        }

    } catch (err) {
        logger.error(`Error in Signup ${err}`)
    }
}

module.exports = {
    signup
}