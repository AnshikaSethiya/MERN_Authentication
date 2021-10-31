require("dotenv").config({path:'.env'})
const express = require('express');
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error')

//connect to db
connectDB();


const app = express();

app.use(express.json()); 

app.use('/api/auth', require('./routes/auth'))

//Error handler should be last piece of middleaware
app.use(errorHandler);

const PORT = process.env.PORT || 7000; 

app.listen(PORT, () => console.log(`Server is up on ${PORT}`));
