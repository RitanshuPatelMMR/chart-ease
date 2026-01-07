import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/User.js";

export interface AuthenticatedRequest extends Request {
    auth?: {
        userId: string;
    };
    user?: IUser;
}

export async function requireUser(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const clerkUserId = req.auth?.userId;

        if (!clerkUserId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Find or create user in MongoDB
        let user = await User.findOne({ clerkUserId });

        if (!user) {
            // If user doesn't exist, create them (sync from Clerk)
            const clerkUser = await (req as any).clerkClient?.users.getUser(clerkUserId);

            user = await User.create({
                clerkUserId,
                email: clerkUser?.emailAddresses[0]?.emailAddress || "unknown@example.com",
                role: "user", // default
                isActive: true,
                lastLoginAt: new Date()
            });

            console.log("✅ New user synced from Clerk:", user.email);
        } else {
            // Update last login
            user.lastLoginAt = new Date();
            await user.save();
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Error in requireUser middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}