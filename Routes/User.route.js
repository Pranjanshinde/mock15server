const express=require("express");
const bcrypt = require('bcrypt');
const { userModel } = require("../models/USer.model");
var jwt = require('jsonwebtoken');
const UserRouter=express.Router();

UserRouter.post("/register",async(req,res)=>{
try {
    const {email,password}=req.body;

bcrypt.hash(password, 3,async function(err, hash) {
    // Store hash in your password DB.
    const user=new userModel({
        email:email,
        password:hash
    });
    await user.save();
    res.send({"mgs":"new user has been registered"});
});
} catch (error) {
    res.send({"msg":error.message});
}

});

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
   const user=await userModel.findOne({email:email});
   
   if(user)
   {
    bcrypt.compare(password, user.password, function(err, result) {
        // result == true
        if(result)
        {
            var token = jwt.sign({ userid: user._id }, 'masai');
            res.send({"msg":"Login Successfull","token":token,"user":user});
        }else{
            res.send({"Msg":"wrong credentials"});
        }
    });
   }else{
    res.send({"msg":"wrong credentials"});
   }
   
    } catch (error) {
        res.send({"msg":error.message});
    }
    
    });

module.exports={UserRouter};