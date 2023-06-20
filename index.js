const express=require("express");
var cors = require('cors');
const { connection } = require('./db');
const { UserRouter } = require("./Routes/User.route");
const { Boardrouter } = require("./Routes/BoardRouter");
const { Auth } = require("./Middleware/Auth");
const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("home page");
});

app.use("/users",UserRouter);

app.use(Auth);
app.use("/boards",Boardrouter);


app.listen(8080,async()=>{
    try {
        console.log("Connecting");
        await connection;
        console.log("connected");
    } catch (error) {
        res.send({"msg":error.message})
    }
});
