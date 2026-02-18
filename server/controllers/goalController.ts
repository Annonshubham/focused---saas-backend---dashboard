import { Request, Response, NextFunction } from 'express';
import Goal from '../models/Goal';

/**
 * @desc    Create a new goal
 * @route   POST /api/goals
 * @access  Private
 */
export const createGoal = async (req: any, res: any, next: NextFunction) => {
  const { title, description, skill, level, targetDays } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !skill || !level || !targetDays) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Create goal with authenticated user ID
    const goal = await Goal.create({
      user: req.user._id,
      title,
      description,
      skill,
      level,
      targetDays,
    });

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all goals for authenticated user
 * @route   GET /api/goals
 * @access  Private
 */
export const getUserGoals = async (req: any, res: any, next: NextFunction) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single goal by ID
 * @route   GET /api/goals/:id
 * @access  Private
 */
export const getSingleGoal = async (req: any, res: any, next: NextFunction) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    // Ensure the goal belongs to the authenticated user
    if (goal.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this goal');
    }

    res.json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};
