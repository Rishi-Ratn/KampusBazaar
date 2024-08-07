import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        priceType: {    // fixed or negotioable
            type: String,
            required: true,
        },
        location: {     // inside iitk or outside
            type: String,
            required: true,
        },
        category: {     // dropdown
            type: String,
            required: true,
        },
        condition: {    // dropdown
            type: String,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },

    }, {timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;