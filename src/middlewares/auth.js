const jsonWebToken = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


const auth = (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message: 'unauthorized user'});
        }

        token = token.split(' ')[1];

        let user = jsonWebToken.verify(token,SECRET_KEY);
        req.userId = user.id;
        next();
    }catch(error){
    
        console.log(`Error on middleware ${error}`);
        return res.status(401).json({message: 'unauthorized user'});
    }
}

module.exports = auth;