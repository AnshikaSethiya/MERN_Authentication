const Test_user = require('../model/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req,res,next) => {
    const { username, email, contact, password } = req.body;

    try {
        const user = await Test_user.create({
            username,
            email,
            contact,
            password,
        });
        sendToken(user, 201, res)
    } catch (error) {
        next(error);
       console.log("Error in signin: ", error);
    } 
};

exports.login = async (req,res,next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        const user = await Test_user.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }
        sendToken(user, 200, res)
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
};

exports.forgotpassword = (req,res,next) => {
    res.send('forgot password Route');
};

exports.resetpasssword = (req,res,next) => {
    res.send('Reset password Route');
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true, token})
}