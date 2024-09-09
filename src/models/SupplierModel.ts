import mongoose, { Schema } from "mongoose";

const SupplierShema = new Schema({
    name: {
        type: "string",
        required: true,
    }
    ,
    product: String
    ,
    categoris: {
        type: [String]
    },
    price: Number,
    Contact: String,
    isTaking: {
        type: Number,
        default: 0,
        enum: [0, 1]

    },
    photoURl: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const SupplierModel= mongoose.model('suppliers' ,SupplierShema)
export default SupplierModel