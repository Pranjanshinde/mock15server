const express=require("express");
var jwt = require('jsonwebtoken');
const { BoardModel } = require("../models/Todo.model");
const Boardrouter=express.Router();

Boardrouter.post("/post",async(req,res)=>{
    try {
        let user=new BoardModel(req.body);
        user.save();
        res.send("New Board has been created");
    } catch (error) {
        res.send({"msg":error.message});
    }
});

Boardrouter.patch("/post/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        await BoardModel.findByIdAndUpdate({_id:id},req.body);
        res.send("Block has been updated");
    } catch (error) {
        res.send({"msg":error.message});
    }
});

Boardrouter.get("/:id",async(req,res)=>{
    try {
        let {id}=req.params;
        let task=await BoardModel.findOne({_id:id});
        res.send(task);
    } catch (error) {
        res.send({"msg":error.message});
    }
});

Boardrouter.get("/",async(req,res)=>{
    try {
        let boards=await BoardModel.find({userid:req.body.userid});
        console.log(boards);
        if(boards.length!=0)
        {
            res.send(boards);
        }else{
            let blog={
                userid:req.body.userid,
                name: "Board 1",
                tasks: [
                 
                ]
              }
              let  blog1=new BoardModel(blog);
        await blog1.save();
        let board=await BoardModel.find({userid:req.body.userid});
        res.send(board);
        }
        
    } catch (error) {
        res.send({"msg":error.message});
    }
});



module.exports={Boardrouter};