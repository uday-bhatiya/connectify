import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

const dbConnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Database already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || "")

        connection.isConnected = db.connections[0].readyState;

        console.log("Database Connected")


    } catch (error) {
        console.log("Database connection faild", error)
        process.exit(1);
    }
}

export default dbConnect;