const { default: mongoose } = require("mongoose");
const monggose=require("mongoose");

const Taskschema=mongoose.Schema({
    title:String,
    description:String,
    status:String,
    subtask:Array
});

const Boardschema=mongoose.Schema({
    userid:String,
    name:String,
    tasks:Array
});

const BoardModel=mongoose.model("board",Boardschema);

module.exports={BoardModel};
