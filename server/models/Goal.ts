import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Goal must belong to a user'],
    },
    title: {
      type: String,
      required: [true, 'Please add a goal title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a goal description'],
    },
    skill: {
      type: String,
      required: [true, 'Please specify a skill'],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Please specify a level'],
    },
    targetDays: {
      type: Number,
      required: [true, 'Please specify target days'],
    },
    progress: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries by user
goalSchema.index({ user: 1 });

export default mongoose.model('Goal', goalSchema);
