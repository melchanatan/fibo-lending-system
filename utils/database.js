import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async() => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("MongoBD is already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "fra161_lending",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error);
    }
}
