"use client";

import FilterModal from "@/components/FilterModal";
import Header from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { DataTable } from "@/components/ui/DataTable";
import { ReportFilters } from "@/lib/filter";
import { Bell } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import UsersGroupIcon from "../../../components/svgs/UserGroupIcon";
import { makeColumns, ShortCodeRequest } from "./colums";
import { requestData } from "./data";

const fmt2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const formatDate = (d: Date) =>
  `${fmt2(d.getDate())}/${fmt2(d.getMonth() + 1)}/${d.getFullYear()}`;
const parseISO = (s: string) => new Date(s);
const inRange = (d: Date, range?: DateRange) => {
  if (!range?.from && !range?.to) return true;
  if (range?.from && !range?.to)
    return d >= new Date(range.from.setHours(0, 0, 0, 0));
  if (!range?.from && range?.to)
    return d <= new Date(range.to.setHours(23, 59, 59, 999));
  const from = new Date(range!.from!.setHours(0, 0, 0, 0));
  const to = new Date(range!.to!.setHours(23, 59, 59, 999));
  return d >= from && d <= to;
};

const metrics = [
  {
    label: "Total Number of Merchants",
    value: 0,
    percentage: "0.00%",
    background: "bg-green-50",
    iconColor: "text-green-600",
    icon: <UsersGroupIcon className="w-5 h-5" />,
  },
  {
    label: "Active Merchants",
    value: 0,
    percentage: "0.00%",
    background: "bg-red-50",
    iconColor: "text-red-600",
    icon: <UsersGroupIcon className="w-5 h-5" />,
  },
  {
    label: "Inactive Merchants",
    value: 0,
    percentage: "0.00%",
    background: "bg-purple-50",
    iconColor: "text-purple-600",
    icon: <UsersGroupIcon className="w-5 h-5" />,
  },
];
export default function DashboardOverview() {
  const [data, setData] = useState<ShortCodeRequest[]>(requestData);
  const [filters, setFilters] = useState<ReportFilters>();
  const [showFilter, setShowFilter] = useState(false);

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: start,
    to: today,
  });

  const displayRange =
    range?.from && range?.to
      ? `${formatDate(range.from)}  -  ${formatDate(range.to)}`
      : range?.from
      ? `${formatDate(range.from)}`
      : "Select date range";

  const handleAction = React.useCallback(
    (row: ShortCodeRequest, action: "accept" | "reject") => {
      setData((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? {
                ...r,
                status: action === "accept" ? "Approved" : "Declined",
                editable: action === "accept" ? false : r.editable,
              }
            : r
        )
      );
      toast.success(
        `${action === "accept" ? "Accepted" : "Rejected"} request ${row.id}`
      );
    },
    []
  );

  const columns = React.useMemo(
    () => makeColumns(handleAction),
    [handleAction]
  );

  return (
    <>
      <Header
        children={
          <>
            <h1 className="text-3xl font-bold">Hello, Sinzu Berry</h1>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium text-base">
                Welcome and Let’s do some work today!
              </p>
              <div className="md:flex items-center gap-2 hidden">
                <Bell className="w-5 h-5" />
              </div>
            </div>
          </>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      <div className="space-y-6 mt-8">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold">
              Recent Pending Requests
            </h2>
            <span className="text-base font-semibold text-gray-800">
              {requestData.length}
            </span>
          </div>

          <FilterModal
            reportType={"plain"}
            isOpen={showFilter}
            setIsOpen={setShowFilter}
            initialFilters={filters}
            onApply={(next) => setFilters(next)}
          />
        </div>

        {/* Framed table with zebra rows */}
        <div className="[&>div>table>tbody>tr:nth-child(odd)]:bg-[#FBFCFF]">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
