
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
// Using any for req and res to bypass incorrect type resolution for Express Request/Response in this environment
export const registerUser = async (req: any, res: any, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user: any = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
// Using any for req and res to bypass incorrect type resolution for Express Request/Response in this environment
export const loginUser = async (req: any, res: any, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Find user by email and include password field for comparison
    const user: any = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};
