require("dotenv").config({path:'.env'})
const express = require('express');
const app = express();

app.use(express.json()); 

app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 7000; 

app.listen(PORT, () => console.log(`Server is up on ${PORT}`));
