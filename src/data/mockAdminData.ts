import { AdminUser, AdminPayment, AdminMetrics, UserGrowthData } from "@/types/admin";

export const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "admin",
    plan: "premium",
    status: "active",
    chartsCount: 45,
    joinedAt: "2024-01-15",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "user",
    plan: "premium",
    status: "active",
    chartsCount: 32,
    joinedAt: "2024-02-20",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    role: "user",
    plan: "free",
    status: "active",
    chartsCount: 12,
    joinedAt: "2024-03-10",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "user",
    plan: "free",
    status: "inactive",
    chartsCount: 5,
    joinedAt: "2024-03-25",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.b@example.com",
    role: "user",
    plan: "premium",
    status: "active",
    chartsCount: 28,
    joinedAt: "2024-04-05",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    role: "user",
    plan: "free",
    status: "active",
    chartsCount: 8,
    joinedAt: "2024-04-18",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james.t@example.com",
    role: "user",
    plan: "free",
    status: "suspended",
    chartsCount: 3,
    joinedAt: "2024-05-02",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
  },
  {
    id: "8",
    name: "Amanda Martinez",
    email: "amanda.m@example.com",
    role: "admin",
    plan: "premium",
    status: "active",
    chartsCount: 67,
    joinedAt: "2024-01-08",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda",
  },
  {
    id: "9",
    name: "Robert Garcia",
    email: "robert.g@example.com",
    role: "user",
    plan: "free",
    status: "active",
    chartsCount: 15,
    joinedAt: "2024-05-20",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    id: "10",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    role: "user",
    plan: "premium",
    status: "active",
    chartsCount: 41,
    joinedAt: "2024-02-14",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
  },
  {
    id: "11",
    name: "Chris Thompson",
    email: "chris.t@example.com",
    role: "user",
    plan: "free",
    status: "active",
    chartsCount: 6,
    joinedAt: "2024-06-01",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris",
  },
  {
    id: "12",
    name: "Michelle White",
    email: "michelle.w@example.com",
    role: "user",
    plan: "free",
    status: "inactive",
    chartsCount: 2,
    joinedAt: "2024-06-15",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michelle",
  },
];

export const mockPayments: AdminPayment[] = [
  {
    id: "pay_001",
    userId: "1",
    userName: "John Smith",
    userEmail: "john.smith@example.com",
    plan: "pro",
    amount: 29,
    transactionId: "txn_3Mq7vL2eZvKYlo2C",
    status: "completed",
    date: "2024-06-15",
  },
  {
    id: "pay_002",
    userId: "2",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@example.com",
    plan: "pro",
    amount: 29,
    transactionId: "txn_4Np8wM3fZaLXmp3D",
    status: "completed",
    date: "2024-06-14",
  },
  {
    id: "pay_003",
    userId: "5",
    userName: "David Brown",
    userEmail: "david.b@example.com",
    plan: "enterprise",
    amount: 99,
    transactionId: "txn_5Oq9xN4gAbMYnq4E",
    status: "completed",
    date: "2024-06-12",
  },
  {
    id: "pay_004",
    userId: "8",
    userName: "Amanda Martinez",
    userEmail: "amanda.m@example.com",
    plan: "enterprise",
    amount: 99,
    transactionId: "txn_6Pr0yO5hBcNZor5F",
    status: "completed",
    date: "2024-06-10",
  },
  {
    id: "pay_005",
    userId: "10",
    userName: "Jennifer Lee",
    userEmail: "jennifer.l@example.com",
    plan: "pro",
    amount: 29,
    transactionId: "txn_7Qs1zP6iCdOAps6G",
    status: "pending",
    date: "2024-06-18",
  },
  {
    id: "pay_006",
    userId: "1",
    userName: "John Smith",
    userEmail: "john.smith@example.com",
    plan: "pro",
    amount: 29,
    transactionId: "txn_8Rt2aQ7jDeQBqt7H",
    status: "completed",
    date: "2024-05-15",
  },
  {
    id: "pay_007",
    userId: "9",
    userName: "Robert Garcia",
    userEmail: "robert.g@example.com",
    plan: "starter",
    amount: 9,
    transactionId: "txn_9Su3bR8kEfRCru8I",
    status: "failed",
    date: "2024-06-17",
  },
  {
    id: "pay_008",
    userId: "2",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@example.com",
    plan: "pro",
    amount: 29,
    transactionId: "txn_0Tv4cS9lFgSDsv9J",
    status: "refunded",
    date: "2024-05-14",
  },
  {
    id: "pay_009",
    userId: "5",
    userName: "David Brown",
    userEmail: "david.b@example.com",
    plan: "enterprise",
    amount: 99,
    transactionId: "txn_1Uw5dT0mGhTEtw0K",
    status: "completed",
    date: "2024-05-12",
  },
  {
    id: "pay_010",
    userId: "10",
    userName: "Jennifer Lee",
    userEmail: "jennifer.l@example.com",
    plan: "starter",
    amount: 9,
    transactionId: "txn_2Vx6eU1nHiUFux1L",
    status: "pending",
    date: "2024-06-19",
  },
];

// Calculate total revenue from completed payments
const completedRevenue = mockPayments
  .filter((p) => p.status === "completed")
  .reduce((sum, p) => sum + p.amount, 0);

export const mockMetrics: AdminMetrics = {
  totalUsers: mockUsers.length,
  freeUsers: mockUsers.filter((u) => u.plan === "free").length,
  premiumUsers: mockUsers.filter((u) => u.plan === "premium").length,
  totalCharts: mockUsers.reduce((sum, u) => sum + u.chartsCount, 0),
  totalRevenue: completedRevenue,
};

export const weeklyGrowthData: UserGrowthData[] = [
  { period: "Mon", users: 2, charts: 15 },
  { period: "Tue", users: 3, charts: 22 },
  { period: "Wed", users: 1, charts: 18 },
  { period: "Thu", users: 4, charts: 31 },
  { period: "Fri", users: 2, charts: 25 },
  { period: "Sat", users: 1, charts: 12 },
  { period: "Sun", users: 2, charts: 8 },
];

export const monthlyGrowthData: UserGrowthData[] = [
  { period: "Week 1", users: 8, charts: 65 },
  { period: "Week 2", users: 12, charts: 89 },
  { period: "Week 3", users: 10, charts: 102 },
  { period: "Week 4", users: 15, charts: 134 },
];

export const yearlyGrowthData: UserGrowthData[] = [
  { period: "Jan", users: 15, charts: 120 },
  { period: "Feb", users: 22, charts: 185 },
  { period: "Mar", users: 28, charts: 240 },
  { period: "Apr", users: 35, charts: 310 },
  { period: "May", users: 42, charts: 380 },
  { period: "Jun", users: 48, charts: 445 },
  { period: "Jul", users: 55, charts: 520 },
  { period: "Aug", users: 62, charts: 590 },
  { period: "Sep", users: 70, charts: 665 },
  { period: "Oct", users: 78, charts: 740 },
  { period: "Nov", users: 85, charts: 815 },
  { period: "Dec", users: 92, charts: 890 },
];

export function getUserById(id: string): AdminUser | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function getGrowthData(period: "week" | "month" | "year"): UserGrowthData[] {
  switch (period) {
    case "week":
      return weeklyGrowthData;
    case "month":
      return monthlyGrowthData;
    case "year":
      return yearlyGrowthData;
    default:
      return weeklyGrowthData;
  }
}
