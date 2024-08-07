import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
// import sendEmail from "../utils/sendEmail.js";
// import generateOtp from "../utils/generateOtp.js";
// import Otp from "../models/Otp.model.js";

export const signup = async (req, res, next) => {
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
    // try {
    //     const existingUser = await User.findOne({email});
    //     if(existingUser) return next(errorHandler(409, 'User already exists with this Email!'));

    //     //Generate OTP and store it in database
    //     const otp = generateOtp();
    //     const otpEntry = new Otp({email,otp});
    //     await otpEntry.save();

    //     //send OTP to user's email
    //     await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
    //     res.status(200).json({success: true, message: `OTP Sent successfully to Email`});

    // } catch (error) {
    //     next(error);
    // }
};

// export const VerifyOtpAndCreateUser = async (req, res, next) => {
//     const {email, otp, username, password} = req.body;
//     try {
//         // Retrieve OTP from the database
//         const otpEntry = await Otp.findOne({email, otp});
//         if(!otpEntry) {
//             return res.status(404).json({success: false, message: 'OTP expired or invalid'});
//         }
//         // Create new user
//         const hashedPassword = bcryptjs.hashSync(password, 10);
//         const newUser = new User({username, email, password: hashedPassword});
//         await newUser.save();

//         //Remove OTP after successful verification
//         await Otp.deleteOne({email, otp});

//         res.status(201).json({message: `User created successfully`});
//     } catch (error) {
//         next(error);
//     }
// };

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email: email});
        if(!validUser){
            return next(errorHandler(404, "User not found!"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong credentials!'));
        // if both email and password correct, authenticate the user by adding a cookie inside the browser, we need to create a hash token that includes email or id of the user and then we save this token inside browser cookie, Now we can use this cookie at various point to know if that user is authenticated or not
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const { password:pass, ...rest} = validUser._doc;
        // now save the token as a cookie
        res.cookie('access_token',token, {httpOnly: true, expires: new Date(Date.now() + 24*60*60*1000)}).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user) {
            // if user exists, login 
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
        } else {
            // if user doesn't exist, create a new user with a random password and save it to the database
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({username:req.body.name, email:req.body.email , password:hashedPassword, avatar:req.body.photo});
            await newUser.save();
            const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET);
            const {password: pass,...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
        }
    } catch (error) {
        next(error); 
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User signed out successfully!');
    } catch (error) {
        next(error);
    }
};