

const jwt = require('jsonwebtoken');
const UserModel = require('../Model/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const LinkQr = require('../Model/LinkQr');
const User = require('../Model/User');

exports.getqrlink = async(req,res) => {
   try {
      const qrlink = await LinkQr.find({user:req.user.id})
      res.json(qrlink)
   } 
   catch (error){
            res.json({'error':error})
   }
}

exports.addlink = async(req, res) => {
        const qrlink = req.body.qrlink
        const qrcolor  = req.body.qrcolor
        const user  = req.user.id


        try {
           const newLinkQr = new LinkQr({
            qrlink,
            qrcolor,
            user
           })
        
           const saveQr = await  newLinkQr.save();
           res.json(saveQr)
        }
        catch (error) {
           res.json({"error": error})
        }
   }

exports.reguser = async (req, res) => {
  console.log('Incoming request:', req.body);
  try {
    const uname = req.body.uname;
    const pass = await bcrypt.hash(req.body.pass, 12);
    const uemail = req.body.uemail;
    const newuser = new UserModel({
      username: uname,
      password: pass,
      email: uemail
    });

    const savedUser = await newuser.save();

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });

  } catch (err) {
    console.error('Error in reguser:', err);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.loguser = async (req,res) => {
   const uemail = req.body.uemail;
    const pass = req.body.pass;

    try {
       const userlogin = await UserModel.findOne({"email": uemail})

       if(!userlogin){
         res.json({"loginsts": "1",
           "msg" : "user not found"
         })
        }
         else{
            const ismatch = await bcrypt.compare(pass, userlogin.password)
            if(!ismatch){
              res.json({
                 "loginsts": "2",
                 "msg": "password not match"                 
              })
            
            }
            else{
              const jwt = require('jsonwebtoken');
              const token = await jwt.sign({id:userlogin._id,email:userlogin.email},
                process.env.JWT_SECRET,
                {expiresIn: '5m'}
              )
                res.json({"loginsts" : "0", "token": token})
              
            }
         }

       }
       catch(error) {
          console.error('error in loguser: ',error);
       }

    };




exports.msgg = async (req, res) => {
     res.json({
        "msg": "test user route"
     })
};

