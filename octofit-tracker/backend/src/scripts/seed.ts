import dotenv from 'dotenv';
import mongoose, { connectToDatabase } from '../config/database';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

dotenv.config();

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    {
      name: 'Ariana Chen',
      email: 'ariana.chen@example.com',
      role: 'coach',
      goals: 'Help the team stay consistent and healthy',
      totalPoints: 420,
    },
    {
      name: 'Marcus Reed',
      email: 'marcus.reed@example.com',
      role: 'member',
      goals: 'Improve endurance and complete more group workouts',
      totalPoints: 380,
    },
    {
      name: 'Nina Patel',
      email: 'nina.patel@example.com',
      role: 'member',
      goals: 'Increase weekly workout volume and stamina',
      totalPoints: 460,
    },
  ]);

  const teams = await Team.create([
    {
      name: 'Morning Mavericks',
      description: 'Early risers who love cardio and teamwork.',
      members: [users[0]._id, users[1]._id],
      totalPoints: 800,
    },
    {
      name: 'Sunset Sprinters',
      description: 'Evening athletes focused on fast-paced training.',
      members: [users[2]._id],
      totalPoints: 460,
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'Team Run',
      durationMinutes: 45,
      caloriesBurned: 420,
      distanceKm: 8.2,
      date: new Date('2026-06-25T07:15:00Z'),
      notes: 'Morning interval run around the park.',
    },
    {
      user: users[1]._id,
      team: teams[0]._id,
      type: 'Strength Circuit',
      durationMinutes: 55,
      caloriesBurned: 530,
      date: new Date('2026-06-26T06:30:00Z'),
      notes: 'Full-body circuit with kettlebell swings and push-ups.',
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      type: 'HIIT Ladder',
      durationMinutes: 35,
      caloriesBurned: 410,
      date: new Date('2026-06-26T19:00:00Z'),
      notes: 'High intensity intervals with recovery sets.',
    },
  ]);

  const workouts = await Workout.create([
    {
      title: 'Team Strength Builder',
      description: 'A partner-friendly strength workout for upper body and core.',
      difficulty: 'intermediate',
      durationMinutes: 50,
      focusAreas: ['upper body', 'core', 'teamwork'],
      exercises: [
        { name: 'Partner Push-ups', reps: 12, sets: 3 },
        { name: 'Medicine Ball Slams', reps: 15, sets: 3 },
        { name: 'Plank High-Fives', durationMinutes: 5 },
      ],
    },
    {
      title: 'Endurance Sprint Set',
      description: 'Sprint intervals and recovery drills for speed and stamina.',
      difficulty: 'advanced',
      durationMinutes: 40,
      focusAreas: ['cardio', 'speed', 'endurance'],
      exercises: [
        { name: '200m Sprint', reps: 5 },
        { name: 'Jumping Lunges', reps: 20, sets: 3 },
        { name: 'Cool-down Walk', durationMinutes: 5 },
      ],
    },
    {
      title: 'Recovery Flow',
      description: 'Low-impact mobility and stretching routine for recovery days.',
      difficulty: 'beginner',
      durationMinutes: 30,
      focusAreas: ['mobility', 'flexibility', 'recovery'],
      exercises: [
        { name: 'Dynamic Hip Openers', durationMinutes: 8 },
        { name: 'Leg Swings', reps: 12, sets: 2 },
        { name: 'Gentle Yoga Flow', durationMinutes: 15 },
      ],
    },
  ]);

  await Leaderboard.create([
    {
      targetType: 'Team',
      targetRef: teams[0]._id,
      rank: 1,
      points: 800,
    },
    {
      targetType: 'Team',
      targetRef: teams[1]._id,
      rank: 2,
      points: 460,
    },
    {
      targetType: 'User',
      targetRef: users[2]._id,
      rank: 1,
      points: 460,
    },
    {
      targetType: 'User',
      targetRef: users[0]._id,
      rank: 2,
      points: 420,
    },
  ]);

  console.log('Inserted users:', users.length);
  console.log('Inserted teams:', teams.length);
  console.log('Inserted activities:', activities.length);
  console.log('Inserted workouts:', workouts.length);
  console.log('Inserted leaderboard entries: 4');

  await mongoose.disconnect();
  console.log('Seed complete.');
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
