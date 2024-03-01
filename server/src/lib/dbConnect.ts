// import { config } from "dotenv";
import mongoose from "mongoose"
// config();

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "web-compiler",

        });
        console.log("Database Connection Established")
    }
    catch (err) {
        console.log("Database Connection Failed", err);
    }


}