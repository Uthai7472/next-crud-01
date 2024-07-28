import mongoose, { mongo } from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;