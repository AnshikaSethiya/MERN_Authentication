const User = require('../model/User')

exports.register = async (req,res,next) => {
    const { username, email, contact, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            contact,
            passsword,
        })

        res.status(201).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
};

exports.login = (req,res,next) => {
    res.send('Login Route');
};

exports.forgotpassword = (req,res,next) => {
    res.send('forgot password Route');
};

exports.resetpasssword = (req,res,next) => {
    res.send('Reset password Route');
};