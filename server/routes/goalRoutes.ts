import express from "express";
import {
  createGoal,
  getUserGoals,
  getSingleGoal
} from "../controllers/goalController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createGoal);
router.get("/", protect, getUserGoals);
router.get("/:id", protect, getSingleGoal);

export default router;
