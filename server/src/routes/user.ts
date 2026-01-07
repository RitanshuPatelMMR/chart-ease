import { Router, Response } from "express";
import { requireAuth } from "@clerk/express";
import { requireUser, AuthenticatedRequest } from "../middleware/requireUser.js";

export const userRouter = Router();

userRouter.use(requireAuth());
userRouter.use(requireUser);

// GET /api/user/me - Get current user info
userRouter.get("/me", async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    res.json({
        id: req.user.clerkUserId,
        email: req.user.email,
        role: req.user.role,
        isActive: req.user.isActive
    });
});