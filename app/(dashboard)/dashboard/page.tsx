// app/(dashboard)/dashboard/DashboardOverview.tsx

"use client";

import Header from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { UsersIcon } from "lucide-react";

export default function DashboardOverview() {
  const metrics = [
    {
      label: "Total Number of Merchants",
      value: 0,
      percentage: "0.00%",
      background: "bg-green-50",
      iconColor: "text-green-600",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      label: "Active Merchants",
      value: 0,
      percentage: "0.00%",
      background: "bg-red-50",
      iconColor: "text-red-600",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      label: "Inactive Merchants",
      value: 0,
      percentage: "0.00%",
      background: "bg-purple-50",
      iconColor: "text-purple-600",
      icon: <UsersIcon className="w-5 h-5" />,
    },

    {
      label: "Pending Requests",
      value: 0,
      percentage: "0.00%",
      background: "bg-purple-50",
      iconColor: "text-purple-600",
      icon: <UsersIcon className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            label={metric.label}
            value={metric.value}
            percentage={metric.percentage}
            background={metric.background}
            iconColor={metric.iconColor}
            icon={metric.icon}
          />
        ))}
      </div>
    </>
  );
}
