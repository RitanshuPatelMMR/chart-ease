import { useState, useEffect, useCallback, useRef } from "react";
import { SavedChart } from "@/types/chart";
import { useAuth } from "@clerk/clerk-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export function useLocalCharts() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [charts, setCharts] = useState<SavedChart[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetchedRef = useRef(false);

    // helper to call API with auth header
    const apiFetch = useCallback(
        async (path: string, options: RequestInit = {}) => {
            const token = await getToken();
            if (!token) {
                throw new Error("No auth token available");
            }
            const headers: HeadersInit = {
                ...(options.headers || {}),
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API error ${res.status}: ${text}`);
            }
            return res;
        },
        [getToken]
    );

    // load charts on mount (only once when user is signed in)
    useEffect(() => {
        if (!isLoaded || !isSignedIn || hasFetchedRef.current) {
            return;
        }

        console.log("🔄 Loading charts from API...");
        hasFetchedRef.current = true;

        (async () => {
            try {
                const res = await apiFetch("/api/charts");
                const data = (await res.json()) as SavedChart[];
                console.log("📥 Charts loaded:", data.length, "charts");
                setCharts(data);
            } catch (e) {
                console.error("❌ Failed to load charts", e);
                hasFetchedRef.current = false; // retry on next render
            } finally {
                setIsLoading(false);
            }
        })();
    }, [isLoaded, isSignedIn, apiFetch]);

    const saveChart = useCallback(
        async (chart: Omit<SavedChart, "id" | "createdAt" | "updatedAt">) => {
            console.log("🔵 Saving chart:", chart.name);
            const res = await apiFetch("/api/charts", {
                method: "POST",
                body: JSON.stringify(chart),
            });
            const saved = (await res.json()) as SavedChart;
            console.log("✅ Chart saved with ID:", saved.id);

            // ✅ IMMEDIATELY add to state (optimistic update)
            setCharts((prev) => {
                const updated = [saved, ...prev];
                console.log("📊 Total charts now:", updated.length);
                return updated;
            });

            return saved;
        },
        [apiFetch]
    );

    const updateChart = useCallback(
        async (
            id: string,
            updates: Partial<Omit<SavedChart, "id" | "createdAt">>
        ) => {
            console.log("🔵 Updating chart:", id);
            const res = await apiFetch(`/api/charts/${id}`, {
                method: "PUT",
                body: JSON.stringify(updates),
            });
            const updated = (await res.json()) as SavedChart;
            console.log("✅ Chart updated");

            setCharts((prev) =>
                prev.map((c) => (c.id === id ? updated : c))
            );
            return updated;
        },
        [apiFetch]
    );

    const deleteChart = useCallback(
        async (id: string) => {
            console.log("🔵 Deleting chart:", id);
            const res = await apiFetch(`/api/charts/${id}`, {
                method: "DELETE",
            });
            const body = await res.json();
            if (body.success) {
                console.log("✅ Chart deleted");
                setCharts((prev) => prev.filter((c) => c.id !== id));
                return true;
            }
            return false;
        },
        [apiFetch]
    );

    const duplicateChart = useCallback(
        async (id: string) => {
            console.log("🔵 Duplicating chart:", id);
            const res = await apiFetch(`/api/charts/${id}/duplicate`, {
                method: "POST",
            });
            const duplicated = (await res.json()) as SavedChart;
            console.log("✅ Chart duplicated");

            setCharts((prev) => [duplicated, ...prev]);
            return duplicated;
        },
        [apiFetch]
    );

    const getChart = useCallback(
        async (id: string) => {
            console.log("🔵 Fetching chart:", id);
            const res = await apiFetch(`/api/charts/${id}`);
            const chart = (await res.json()) as SavedChart;
            return chart;
        },
        [apiFetch]
    );

    const refreshCharts = useCallback(async () => {
        console.log("🔄 Refreshing charts...");
        const res = await apiFetch("/api/charts");
        const data = (await res.json()) as SavedChart[];
        console.log("📥 Refreshed:", data.length, "charts");
        setCharts(data);
    }, [apiFetch]);

    return {
        charts,
        isLoading,
        saveChart,
        updateChart,
        deleteChart,
        duplicateChart,
        getChart,
        refreshCharts,
    };
}