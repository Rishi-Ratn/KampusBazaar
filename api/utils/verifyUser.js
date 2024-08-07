import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;        // since our token name was access_token
    if(!token) return next(errorHandler(401,'Unauthorized'));

    //if there is a token, we need to check, if the token is correct or not
    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err) return next(errorHandler(403,'Forbidden'));
        req.user = user;   //we get the user from the cookie and pass it to the callback
        next();            //after passing we go to the next i.e updateUser in user.route.js, i.e first verifyToken runs then updateUser
    });
 
};