import mongoose, { Document, Schema, model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusAreas: string[];
  exercises: { name: string; reps?: number; sets?: number; durationMinutes?: number }[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true },
    focusAreas: [{ type: String, required: true }],
    exercises: [
      {
        name: { type: String, required: true },
        reps: { type: Number },
        sets: { type: Number },
        durationMinutes: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default model<IWorkout>('Workout', workoutSchema);
