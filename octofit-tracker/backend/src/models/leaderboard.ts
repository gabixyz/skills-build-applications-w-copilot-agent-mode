import mongoose, { Document, Schema, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  targetType: 'Team' | 'User';
  targetRef: mongoose.Types.ObjectId;
  rank: number;
  points: number;
  snapshotAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    targetType: { type: String, required: true, enum: ['Team', 'User'] },
    targetRef: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'targetType',
    },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    snapshotAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
