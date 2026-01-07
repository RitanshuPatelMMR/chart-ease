import { Router, Response, NextFunction } from "express"; // ← Add NextFunction
import { requireAuth } from "@clerk/express";
import { requireUser, AuthenticatedRequest } from "../middleware/requireUser.js";
import { User } from "../models/User.js";
import { Chart } from "../models/Chart.js";

export const adminRouter = Router();

// Apply auth + user middleware
adminRouter.use(requireAuth());
adminRouter.use(requireUser);

// Middleware: Check if user is admin
function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // ↑ Changed Function to NextFunction
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
    }
    next();
}

adminRouter.use(requireAdmin);

// GET /api/admin/metrics - Dashboard top cards
adminRouter.get("/metrics", async (_req: AuthenticatedRequest, res: Response) => {
    // ↑ Added underscore to unused parameter
    try {
        const totalUsers = await User.countDocuments();
        const freeUsers = await User.countDocuments({ role: "user" });
        const premiumUsers = 0;
        const totalCharts = await Chart.countDocuments();

        res.json({
            totalUsers,
            freeUsers,
            premiumUsers,
            totalCharts,
            totalRevenue: 0
        });
    } catch (error) {
        console.error("❌ Error fetching metrics:", error);
        res.status(500).json({ error: "Failed to fetch metrics" });
    }
});

// GET /api/admin/growth?period=week|month|year
adminRouter.get("/growth", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const period = (req.query.period as string) || "month";

        const getDateRange = () => {
            const now = new Date();
            if (period === "week") {
                const start = new Date(now);
                start.setDate(now.getDate() - 7);
                return { start, labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] };
            } else if (period === "month") {
                const start = new Date(now);
                start.setDate(now.getDate() - 28);
                return { start, labels: ["Week 1", "Week 2", "Week 3", "Week 4"] };
            } else {
                const start = new Date(now);
                start.setMonth(now.getMonth() - 12);
                return {
                    start,
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                };
            }
        };

        const { start, labels } = getDateRange();

        const userGrowth = await User.aggregate([
            { $match: { createdAt: { $gte: start } } },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: period === "week" ? "%u" : period === "month" ? "%U" : "%m",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const chartGrowth = await Chart.aggregate([
            { $match: { createdAt: { $gte: start } } },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: period === "week" ? "%u" : period === "month" ? "%U" : "%m",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const userMap = new Map(userGrowth.map(g => [g._id, g.count]));
        const chartMap = new Map(chartGrowth.map(g => [g._id, g.count]));

        const data = labels.map((label, index) => ({
            period: label,
            users: userMap.get(String(index + 1)) || 0,
            charts: chartMap.get(String(index + 1)) || 0
        }));

        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching growth data:", error);
        res.status(500).json({ error: "Failed to fetch growth data" });
    }
});

// GET /api/admin/users - List all users
adminRouter.get("/users", async (_req: AuthenticatedRequest, res: Response) => {
    // ↑ Added underscore to unused parameter
    try {
        console.log("📥 Admin fetching all users");
        const users = await User.find().sort({ createdAt: -1 });

        const usersWithCharts = await Promise.all(
            users.map(async (user) => {
                const chartsCount = await Chart.countDocuments({ userId: user.clerkUserId });
                return {
                    id: user.clerkUserId,
                    name: user.email.split('@')[0],
                    email: user.email,
                    role: user.role,
                    plan: "free" as const,
                    status: (user.isActive ? "active" : "inactive") as "active" | "inactive",
                    chartsCount,
                    joinedAt: user.createdAt.toISOString(),
                    lastLogin: user.lastLoginAt?.toISOString() || null,
                    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
                };
            })
        );

        console.log("✅ Returning", usersWithCharts.length, "users");
        res.json(usersWithCharts);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// GET /api/admin/users/:id - Single user details
adminRouter.get("/users/:id", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ clerkUserId: id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const chartsCount = await Chart.countDocuments({ userId: user.clerkUserId });
        const charts = await Chart.find({ userId: user.clerkUserId })
            .sort({ updatedAt: -1 })
            .limit(10);

        res.json({
            id: user.clerkUserId,
            email: user.email,
            role: user.role,
            plan: "free",
            status: user.isActive ? "active" : "inactive",
            chartsCount,
            joinedAt: user.createdAt.toISOString(),
            lastLogin: user.lastLoginAt?.toISOString() || null,
            recentCharts: charts.map(c => ({
                id: c._id.toString(),
                name: c.name,
                createdAt: c.createdAt.toISOString()
            }))
        });
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});