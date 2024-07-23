import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    isDelete: { type: Boolean, default: false }
})

export const subCategory = mongoose.model("subcategory",subCategorySchema)