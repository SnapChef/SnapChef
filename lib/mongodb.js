import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        // console.log("Connected to MongoDB. Chiefly.");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}