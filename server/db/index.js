import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}

export {connectDB};