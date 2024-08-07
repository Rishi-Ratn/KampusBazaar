import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404, 'Listing not found!'));
    if(listing.userRef.toString()!== req.user.id) return next(errorHandler(403, 'You can only delete your own listings!'));
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404, 'Listing not found!'));
    if(listing.userRef.toString() !== req.user.id) return next(errorHandler(403, 'You can only update your own listings!'));
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(404, 'Listing not found!'));
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit || 9);
        const startIndex = parseInt(req.query.startIndex || 0);
        
        let priceType = req.query.priceType;
        if(priceType === undefined || priceType === 'any' ){
            priceType = { $in: ['fixed', 'negotiable'] };
        }

        let location = req.query.location;
        if(location === undefined || location === 'Any' ){
            location = { $in: ['insideIITK', 'outsideIITK'] };
        }

        let category = req.query.category;
        if(category === undefined || category === 'All' ){
            category = { $in: ['Bicyle', 'Cooler', 'Mobile', 'Laptop', 'Books', 'Ticket', 'Study Materials', 'Electronic Appliances', 'Lab Equipments','Calculators','Mattress','Room Decor','Others'] };
        }

        let condition = req.query.condition;
        if(condition === undefined || condition === 'All' ){
            condition = { $in: ['Brand New', 'Almost Like New', 'Gently Used', 'Heavily Used'] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            title: { $regex:searchTerm, $options: 'i' },               // regex built in for mongodb , options i means dont care about lowercase or uppercase
            priceType: priceType,
            location: location,
            category: category,
            condition: condition,
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
};