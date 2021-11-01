 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken');

 const UserSchema = new mongoose.Schema({
     username: {
        type:String,
        required:[true, "Please Provide a username"] 
     },
     email:{
         type: String,
         required:[true, "Please provide a email"],
         unique:true,
         match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 
             "Please Provide a valid email"    
         ]
     },
     contact:{
        type:Number,
        required:[true,"Please Provide Contact Number"],
        minlength:10,
        maxlength:10
     },
     password: {
        type:String,
        required:[true, "Please add a password"],
        minlength:6,
        select:false
      },
      resetPasswordToken: String,
      resetPasswordExpire:Date
 });


UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }  

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE})
}

 const Test_User = mongoose.model("Test_User", UserSchema)

 module.exports = Test_User;