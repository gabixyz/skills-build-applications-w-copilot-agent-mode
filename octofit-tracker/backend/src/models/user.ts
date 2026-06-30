import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
  goals: string;
  team?: mongoose.Types.ObjectId;
  totalPoints: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    joinedAt: { type: Date, default: () => new Date() },
    goals: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
