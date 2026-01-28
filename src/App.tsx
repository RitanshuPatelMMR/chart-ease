import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ClerkProviderWrapper } from "@/components/auth/ClerkProviderWrapper";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments"; // We'll create this
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <ClerkProviderWrapper>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Index />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/sign-in/*" element={<SignIn />} />
                            <Route path="/sign-up/*" element={<SignUp />} />

                            {/* User Dashboard */}
                            <Route
                                path="/dashboard/*"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Admin Routes - All wrapped in ProtectedRoute + AdminRoute */}
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <AdminRoute>
                                            <AdminLayout>
                                                <AdminDashboard />
                                            </AdminLayout>
                                        </AdminRoute>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/admin/users"
                                element={
                                    <ProtectedRoute>
                                        <AdminRoute>
                                            <AdminLayout>
                                                <AdminUsers />
                                            </AdminLayout>
                                        </AdminRoute>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/admin/payments"
                                element={
                                    <ProtectedRoute>
                                        <AdminRoute>
                                            <AdminLayout>
                                                <AdminPayments />
                                            </AdminLayout>
                                        </AdminRoute>
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ClerkProviderWrapper>
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;