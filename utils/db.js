const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((error) => {
        console.log("Connection Error: ",error)
    })
    
};

module.exports = connectDB;
