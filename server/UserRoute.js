const express = require('express');
 const router =express.Router();

 // const {  reguser } = require('./component/UserController'); 
 const {reguser , msgg , loguser, addlink, getqrlink} = require('./component/UserController');
 const {uAuth} = require('./middleware/UserAuthentication');
  

 router.get('/controller',async(req,res)=>{
            res.json({
                "msg": "tes user route using controller"
            })
 })
  
 //http://localhost:5000/testuser/getqrlink
   router.get('/getqrlink',uAuth,getqrlink)
    
  router.get('/uAUth',uAuth, async(req,res) => {
     res.json({
         "msg": "test user route using uAuth"
     })
  });
  
  //http://localhost:5000/testuser/addlinkqr {qrlink,qrcolor,user} take  give = {saveqr msg}
  router.post('/addlinkqr',uAuth,addlink);
  //http://localhost:5000/testuser/reguser {uname,uemail,upass}take give = {msg ,user{id,username,email}}
  router.post('/reguser', reguser);

  //http://localhost:5000/testuser/loguser {uemail,pass} = take  give = {loginsts,tokenid}
  router.post('/loguser',loguser);
 

  //http://localhost:5000/testuser/route {msg} = take
 router.get('/route',async(req,res)=>{
          res.json({
                "msg": "test user route"
          })
 })
 //http://localhost:5000/testuser/msgg {msgg} = take 
 router.get('/msgg',msgg);


 module.exports = router;