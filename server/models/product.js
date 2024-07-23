import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    stock: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory", required: true },
    isDelete: { type: Boolean, default: false }
}, { timestamps: true });

export const Product = mongoose.model("product", productSchema);