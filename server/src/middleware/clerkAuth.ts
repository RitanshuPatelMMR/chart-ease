import type { Request, Response, NextFunction } from "express";
import { clerkClient, requireAuth } from "@clerk/express";

export interface AuthenticatedRequest extends Request {
    auth?: {
        userId: string;
    };
}

// This middleware will be used by Express
export const clerkAuth = requireAuth();

// Helper to get userId from request
export function getUserId(req: Request): string {
    const userId = (req as any).auth?.userId;
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return userId;
}