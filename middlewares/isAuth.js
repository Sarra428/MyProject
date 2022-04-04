const jwt = require("jsonwebtoken")

const UserSchema = require("../models/Auth")
const isAuth = async (req, res, next) => {

try {
    const token = req.headers['authorization']

    if (!token){
        return res.status('You are not authorized')
    }


    var decoded = jwt.verify(token, process.env.SecretOrKey)
    const user = await UserSchema.findById(decoded._id)

    req.user = user
    next()


} catch (error) {
    res.status(500).send({msg:"isAuth server error"})
}

}



module.exports = isAuth