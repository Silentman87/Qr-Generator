const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const userRouter = require('./UserRoute');

const User = require('./Model/User');
 // if it's in models/User.js


const app = express();


app.use(cors({
     origin: 'http://localhost:5173', // correct origin
}));
 // handle preflight requests

app.use(bodyparser.json());


app.use('/testuser', userRouter);



const port = process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log(`Server is running on port: ${port}`);
})

