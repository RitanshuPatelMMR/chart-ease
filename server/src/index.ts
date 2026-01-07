import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import { chartsRouter } from "./routes/charts.js";
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
const port = process.env.PORT || 3000;

// CORS - allow frontend to connect
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Add Clerk middleware globally (adds req.auth)
app.use(clerkMiddleware());

// Health check (no auth needed)
app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
});

// Protected routes
app.use("/api/charts", chartsRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
});

async function start() {
    const mongoUri = process.env.MONGODB_URI;
    const clerkSecretKey = process.env.CLERK_SECRET_KEY;
    const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;

    // Validate environment variables
    if (!mongoUri) {
        console.error("❌ MONGODB_URI is not defined in .env file");
        process.exit(1);
    }

    if (!clerkSecretKey) {
        console.error("❌ CLERK_SECRET_KEY is not defined in .env file");
        process.exit(1);
    }

    if (!clerkPublishableKey) {
        console.error("❌ CLERK_PUBLISHABLE_KEY is not defined in .env file");
        process.exit(1);
    }

    console.log("✅ Environment variables loaded:");
    console.log("  - MongoDB URI:", mongoUri.substring(0, 30) + "...");
    console.log("  - Clerk Secret Key:", clerkSecretKey.substring(0, 20) + "...");
    console.log("  - Clerk Publishable Key:", clerkPublishableKey.substring(0, 30) + "...");
    console.log("  - Frontend URL:", process.env.FRONTEND_URL || "http://localhost:8080");

    // Connect to MongoDB
    await connectDB(mongoUri);

    // Start server
    app.listen(port, () => {
        console.log(`✅ Server running on http://localhost:${port}`);
        console.log(`📊 API routes:`);
        console.log(`   - GET  /health`);
        console.log(`   - POST /api/charts`);
        console.log(`   - GET  /api/charts`);
        console.log(`   - GET  /api/user/me`);
        console.log(`   - GET  /api/admin/metrics`);
        console.log(`   - GET  /api/admin/growth`);
        console.log(`   - GET  /api/admin/users`);
    });
}

start().catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
});