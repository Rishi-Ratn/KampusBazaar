// import { useParams }
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: 'API endpoint is working correctly!'
    });
};

export const updateUser = async (req,res,next) => {
    // req.user.id from verifyUser file and req.params.id is the id from user.route update/:id
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'));
    try {
        //if the user is trying to change their password, we need to hash the password
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // now update the user
        // the user might change image and username but not the email and password, so we need to use the method Set, set will check
        // if the data is being changed gets changed otherwise ingnore that data
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{                                       // we should not use $set: req.body, as it might get hacked from insomnia, people might add isadmin true from there
                username: req.body.username,
                avatar: req.body.avatar,
                email: req.body.email,
                password: req.body.password,
            }
        },{new: true});      // new true is goint to return and save the updated user with the new information not the previous information
        
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest); 
    } catch (error) {
        next(error)
    }
};


export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id){                                                // first check person in authenticated, if yes then he can see only his own listings
        try {
            const listings = await Listing.find({userRef: req.user.id})           // find only the listing with this userRef
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(401, 'You can only view your own listings!'));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(404, 'User not found!'));

        const {password:pass,...rest} = user._doc;
        res.status(200).json(rest); 
    } catch (error) {
        next(error);
    }
};