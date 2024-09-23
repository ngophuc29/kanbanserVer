import mongoose, { Schema } from "mongoose";

const shema = new Schema({
    title: {
        required: true,
        type: String,
    },
    parentId: String
    ,
    slug: {
        type: String,
    },
    description: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
    ,
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})
const CategoriModel = mongoose.model("categories", shema);
export default CategoriModel;