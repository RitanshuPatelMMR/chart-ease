

# Admin Dashboard Enhancement Plan

## Overview

Enhance the admin panel with mock payment data, a pie chart for user plan distribution, a live calendar widget, and reorganize the dashboard layout for a more professional appearance.

---

## Changes Summary

### 1. Add Mock Payment Data

**File:** `src/data/mockAdminData.ts`

Add realistic mock payment transactions tied to premium users:

```typescript
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
  // ... 8-10 more transactions with varied statuses, plans, dates
];
```

Update `mockMetrics.totalRevenue` to calculate from payments.

---

### 2. Update Payments Page with Data Table

**File:** `src/pages/admin/AdminPayments.tsx`

- Import `mockPayments` from mock data
- Display payments in the existing table structure
- Add status badges (completed: green, pending: yellow, failed: red, refunded: gray)
- Format amounts with currency symbol
- Format dates nicely

---

### 3. Create User Plan Distribution Pie Chart

**File:** `src/components/admin/UserPlanChart.tsx` (new)

A pie chart showing Free vs Premium user ratio:

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Data derived from mockMetrics
const data = [
  { name: "Free Users", value: mockMetrics.freeUsers, color: "#94a3b8" },
  { name: "Premium Users", value: mockMetrics.premiumUsers, color: "#22c55e" },
];
```

Features:
- Clean pie chart with two segments
- Legend showing user counts
- Percentage labels on hover
- Consistent slate/green color scheme

---

### 4. Create Live Calendar Widget

**File:** `src/components/admin/DashboardCalendar.tsx` (new)

A live calendar card component:

```tsx
import { Calendar } from "@/components/ui/calendar";

export function DashboardCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <p className="text-sm text-muted">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="pointer-events-auto"
        />
      </CardContent>
    </Card>
  );
}
```

Features:
- Shows current date prominently
- Interactive calendar for date viewing
- Styled to match admin theme

---

### 5. Reorganize Dashboard Layout

**File:** `src/pages/admin/AdminDashboard.tsx`

New professional layout structure:

```text
+----------------------------------------------------------+
|                    ADMIN HEADER                           |
+----------------------------------------------------------+
|                                                          |
|  [Total Users] [Free Users] [Premium Users] [Charts] [Revenue]  <- Metric Cards (5 cols)
|                                                          |
+----------------------------------------------------------+
|                                                          |
|  +------------------------+  +------------------------+  |
|  |    User Growth Chart   |  |  Charts Created Chart  |  |
|  |      (Area Chart)      |  |      (Bar Chart)       |  |
|  +------------------------+  +------------------------+  |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|  +------------------------+  +------------------------+  |
|  |   User Plan Ratio      |  |     Live Calendar      |  |
|  |     (Pie Chart)        |  |                        |  |
|  +------------------------+  +------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

Layout grid structure:
- Row 1: 5 metric cards in responsive grid
- Row 2: 2-column grid with User Growth + Charts Created
- Row 3: 2-column grid with Pie Chart + Calendar

---

## File Summary

### New Files (2)
1. `src/components/admin/UserPlanChart.tsx` - Pie chart for user plan distribution
2. `src/components/admin/DashboardCalendar.tsx` - Live calendar widget

### Modified Files (3)
1. `src/data/mockAdminData.ts` - Add mock payments data and update revenue
2. `src/pages/admin/AdminPayments.tsx` - Display payments table with mock data
3. `src/pages/admin/AdminDashboard.tsx` - Add new components and reorganize layout

---

## Technical Details

### Mock Payments Data Structure

```typescript
// 10 sample transactions
const mockPayments: AdminPayment[] = [
  { id, userId, userName, userEmail, plan, amount, transactionId, status, date },
  // Mix of:
  // - 6 completed transactions
  // - 2 pending transactions  
  // - 1 failed transaction
  // - 1 refunded transaction
  // Plans: starter ($9), pro ($29), enterprise ($99)
];
```

### Pie Chart Colors
- Free Users: `#94a3b8` (slate-400)
- Premium Users: `#22c55e` (green-500)

### Payment Status Badge Colors
| Status | Light Mode | Dark Mode |
|--------|------------|-----------|
| Completed | green-100/green-700 | green-900/green-300 |
| Pending | yellow-100/yellow-700 | yellow-900/yellow-300 |
| Failed | red-100/red-700 | red-900/red-300 |
| Refunded | slate-100/slate-600 | slate-800/slate-400 |

### Responsive Behavior
- Metric cards: 2 cols on mobile, 3 on tablet, 5 on desktop
- Charts row: 1 col on mobile, 2 on desktop
- Pie + Calendar row: 1 col on mobile, 2 on desktop

