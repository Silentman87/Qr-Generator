require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../Model/User');


exports.uAuth = async(req,res,next) => {
   const header  = req.header('Authorization');
   if(!header || !header.startsWith('Bearer ')){
      return  res.json({"token": "1", "msg": "token not found"})
   }
       const token = header.split(' ')[1];
   

   try {
       const verified = await jwt.verify(token, process.env.JWT_SECRET);
       req.user = verified;
       next();
   }
   catch(err){
      res.json({"token": "2", "msg": "token not valid"});
   }
 
};


