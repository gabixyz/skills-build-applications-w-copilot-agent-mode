import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase() {
  return mongoose.connect(MONGO_URI);
}

export default mongoose;
