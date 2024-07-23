import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    isDelete: { type: Boolean, default: false }
})

export const Category = mongoose.model('category', categorySchema);