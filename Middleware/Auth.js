var jwt = require('jsonwebtoken');

function Auth(req,res,next){

    let token=req.headers.authorization;
    
    if(token)
    {
        var decoded = jwt.verify(token, 'masai');
        if(decoded)
        {
            req.body.userid=decoded.userid;
            next();
        }else{
            res.send("Kindly login")
        }
    }else{
        res.send("Kindly login")
    }
}

module.exports={Auth};