// import { SavedChart } from "@/types/chart";
//
// const STORAGE_KEY = "chartify_saved_charts";
//
// export function getCharts(): SavedChart[] {
//   try {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   } catch {
//     return [];
//   }
// }
//
// export function getChart(id: string): SavedChart | null {
//   const charts = getCharts();
//   return charts.find((chart) => chart.id === id) || null;
// }
//
// export function saveChart(chart: Omit<SavedChart, "id" | "createdAt" | "updatedAt">): SavedChart {
//   const charts = getCharts();
//   const now = new Date().toISOString();
//
//   const newChart: SavedChart = {
//     ...chart,
//     id: crypto.randomUUID(),
//     createdAt: now,
//     updatedAt: now,
//   };
//
//   charts.unshift(newChart);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
//
//   return newChart;
// }
//
// export function updateChart(id: string, updates: Partial<Omit<SavedChart, "id" | "createdAt">>): SavedChart | null {
//   const charts = getCharts();
//   const index = charts.findIndex((chart) => chart.id === id);
//
//   if (index === -1) return null;
//
//   const updatedChart: SavedChart = {
//     ...charts[index],
//     ...updates,
//     updatedAt: new Date().toISOString(),
//   };
//
//   charts[index] = updatedChart;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
//
//   return updatedChart;
// }
//
// export function deleteChart(id: string): boolean {
//   const charts = getCharts();
//   const filteredCharts = charts.filter((chart) => chart.id !== id);
//
//   if (filteredCharts.length === charts.length) return false;
//
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCharts));
//   return true;
// }
//
// export function duplicateChart(id: string): SavedChart | null {
//   const charts = getCharts();
//   const original = charts.find((chart) => chart.id === id);
//
//   if (!original) return null;
//
//   const now = new Date().toISOString();
//   const duplicate: SavedChart = {
//     ...original,
//     id: crypto.randomUUID(),
//     name: `${original.name} (Copy)`,
//     createdAt: now,
//     updatedAt: now,
//   };
//
//   charts.unshift(duplicate);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
//
//   return duplicate;
// }
