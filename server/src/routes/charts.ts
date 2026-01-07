import { Router, Response } from "express";
import { requireAuth } from "@clerk/express";
import { requireUser, AuthenticatedRequest } from "../middleware/requireUser.js";
import { Chart, SavedChartDocument } from "../models/Chart.js";

export const chartsRouter = Router();

// Apply Clerk auth + our custom user middleware to all routes
chartsRouter.use(requireAuth());
chartsRouter.use(requireUser);

// Helper to get userId (now cleaner!)
function getUserId(req: AuthenticatedRequest): string {
    if (!req.user?.clerkUserId) {
        throw new Error("Unauthorized: No user found");
    }
    return req.user.clerkUserId;
}

// Helper function to format chart response
function formatChartResponse(chart: SavedChartDocument) {
    return {
        id: chart._id.toString(),
        name: chart.name,
        data: chart.data,
        columns: chart.columns,
        config: chart.config,
        xAxisColumn: chart.xAxisColumn,
        selectedYColumns: chart.selectedYColumns,
        thumbnail: chart.thumbnail,
        tags: chart.tags,
        isFavorite: chart.isFavorite,
        createdAt: chart.createdAt.toISOString(),
        updatedAt: chart.updatedAt.toISOString()
    };
}

// GET /api/charts - all charts of logged-in user
chartsRouter.get("/", async (req: AuthenticatedRequest, res: Response) => {
    // ... rest of your code stays the same
    try {
        const userId = getUserId(req);
        console.log("📥 GET /api/charts - User:", req.user?.email);
        const charts = await Chart.find({ userId }).sort({ updatedAt: -1 });
        console.log("✅ Found", charts.length, "charts");
        res.json(charts.map((c) => formatChartResponse(c)));
    } catch (error) {
        console.error("❌ Error fetching charts:", error);
        res.status(500).json({ error: "Failed to fetch charts" });
    }
});

// GET /api/charts/:id
chartsRouter.get("/:id", async (req: AuthenticatedRequest, res) => {
    try {
        const userId = getUserId(req);
        const { id } = req.params;
        console.log("📥 GET /api/charts/:id - User:", req.user?.email, "Chart:", id);
        const chart = await Chart.findOne({ _id: id, userId });
        if (!chart) {
            console.log("❌ Chart not found");
            return res.status(404).json({ error: "Chart not found" });
        }
        console.log("✅ Chart found");
        res.json(formatChartResponse(chart));
    } catch (error) {
        console.error("❌ Error fetching chart:", error);
        res.status(500).json({ error: "Failed to fetch chart" });
    }
});

// POST /api/charts
chartsRouter.post("/", async (req: AuthenticatedRequest, res) => {
    try {
        const userId = getUserId(req);
        const body = req.body;

        console.log("📝 Creating chart for:", req.user?.email);
        console.log("📊 Chart name:", body.name);

        const chart = await Chart.create({
            userId,
            name: body.name,
            data: body.data,
            columns: body.columns,
            config: body.config,
            xAxisColumn: body.xAxisColumn,
            selectedYColumns: body.selectedYColumns,
            thumbnail: body.thumbnail,
            tags: body.tags ?? [],
            isFavorite: body.isFavorite ?? false
        });

        console.log("✅ Chart created with ID:", chart._id);
        res.status(201).json(formatChartResponse(chart));
    } catch (error) {
        console.error("❌ Error creating chart:", error);
        res.status(500).json({ error: "Failed to create chart" });
    }
});

// PUT /api/charts/:id
chartsRouter.put("/:id", async (req: AuthenticatedRequest, res) => {
    try {
        const userId = getUserId(req);
        const { id } = req.params;
        const updates = req.body;

        console.log("📝 Updating chart:", id, "for user:", req.user?.email);

        const chart = await Chart.findOneAndUpdate(
            { _id: id, userId },
            { ...updates },
            { new: true }
        );

        if (!chart) {
            return res.status(404).json({ error: "Chart not found" });
        }

        console.log("✅ Chart updated");
        res.json(formatChartResponse(chart));
    } catch (error) {
        console.error("❌ Error updating chart:", error);
        res.status(500).json({ error: "Failed to update chart" });
    }
});

// DELETE /api/charts/:id
chartsRouter.delete("/:id", async (req: AuthenticatedRequest, res) => {
    try {
        const userId = getUserId(req);
        const { id } = req.params;
        console.log("🗑️ Deleting chart:", id, "for user:", req.user?.email);

        const result = await Chart.deleteOne({ _id: id, userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false });
        }

        console.log("✅ Chart deleted");
        res.json({ success: true });
    } catch (error) {
        console.error("❌ Error deleting chart:", error);
        res.status(500).json({ error: "Failed to delete chart" });
    }
});

// POST /api/charts/:id/duplicate
chartsRouter.post("/:id/duplicate", async (req: AuthenticatedRequest, res) => {
    try {
        const userId = getUserId(req);
        const { id } = req.params;
        console.log("📋 Duplicating chart:", id, "for user:", req.user?.email);

        const original = await Chart.findOne({ _id: id, userId });
        if (!original) {
            return res.status(404).json({ error: "Chart not found" });
        }

        const duplicate = await Chart.create({
            userId,
            name: `${original.name} (Copy)`,
            data: original.data,
            columns: original.columns,
            config: original.config,
            xAxisColumn: original.xAxisColumn,
            selectedYColumns: original.selectedYColumns,
            thumbnail: original.thumbnail,
            tags: original.tags,
            isFavorite: original.isFavorite
        });

        console.log("✅ Chart duplicated with ID:", duplicate._id);
        res.status(201).json(formatChartResponse(duplicate));
    } catch (error) {
        console.error("❌ Error duplicating chart:", error);
        res.status(500).json({ error: "Failed to duplicate chart" });
    }
});