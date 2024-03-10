import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


const authentication = (req, res, next) => {
    try {
        //get token from header, split the "BEARER "
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const basetoken = jwt.verify(token, process.env.JWT_KEY)
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'authentication failed'
        });
    }
        
}

export { authentication };