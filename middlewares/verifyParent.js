import jwt from 'jsonwebtoken';

 const JWT_SECRET = process.env.JWT_SECRET;

const verifyParent = async (req,res , next) => {

    //console.log( req.headers.authorization);
   
    //console.log (req.headers.authorization.split(' ') [1]);

    const token = req.headers.authorization?.split(' ') [1];
        //console.log(token);
        if (!token){
            return res.status(405).json ('Access refused :invalid token')
         }
        try{
            const verify = await jwt.verify(token ,JWT_SECRET);
            console.log(verify);
           
            if(!verify){
                
                return res.status(405).json ('Access denied')
            }
              verify = req.user;
             next();
        }catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token : incorrect signature" });
            }
            if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" });
             }
             return res.status(500).json({ error: "Error while verifating the token" });
}

}

export default verifyParent;