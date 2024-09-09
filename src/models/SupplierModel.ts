import mongoose, { Schema } from "mongoose";

const SupplierShema = new Schema({
    name: {
        type: "string",
        required: true,
    },
    slug: String
    ,
    product: String
    ,
    categoris: {
        type: [String]
    },
    price: Number,
    contact: String,
    isTaking: {
        type: Number,
        default: 0,
        enum: [0, 1]

    },
    photoURL: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    updatedAt: {
        type: Date,
        default: Date.now(),
    }

})

const SupplierModel = mongoose.model('suppliers', SupplierShema)
export default SupplierModel