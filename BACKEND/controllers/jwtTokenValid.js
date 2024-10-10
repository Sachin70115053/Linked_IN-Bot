const jwt = require('jsonwebtoken')

exports.is_jwt_valid = (req,res,next)=>{
    try{
        const token = req.headers['token'];
        
        const decoded = jwt.verify(token,'g3g3h3dwe');
        console.log(decoded)
        if(!decoded){
            console.log("not found")
        }
        console.log(decoded);
        res.status(200).send({
            message : "Sucess"
        })
    }catch(err){
        res.status(400).send({
            message : "Error occured"
        })
    }

}