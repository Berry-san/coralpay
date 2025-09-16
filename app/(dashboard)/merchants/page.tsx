"use client";

import FilterModal from "@/components/FilterModal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { applyReportFilters, FilterOptions, ReportFilters } from "@/lib/filter";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { columns, Merchant } from "./columns";
import { merchants } from "./data";

export default function MerchantPage() {
  const router = useRouter();
  const data = useMemo(() => merchants, []);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: "merchant",
  });
  const dateOptions = {
    dateKeys: ["dateCreated"],
    dateFormat: "DMY" as const,
  } satisfies FilterOptions<Merchant>;

  // const rows = useMemo(
  //   () => applyReportFilters<MerchantRow>(rawRows, filters, dateOptions),
  //   [rawRows, filters]
  // );
  const rows = useMemo(
    () => applyReportFilters<Merchant>(data, filters, dateOptions),
    [data, filters]
  );

  // Memoized data to ensure stability

  const handleRowClick = (merchantId: string) => {
    router.push(`/merchants/${merchantId}`);
  };

  // const handleApplyFilter = ({
  //   startDate,
  //   endDate,
  //   status,
  // }: {
  //   startDate?: string;
  //   endDate?: string;
  //   status?: string;
  // }) => {
  //   let result = [...data];

  //   if (startDate) {
  //     result = result.filter(
  //       (entry) => new Date(entry.dateCreated) >= new Date(startDate)
  //     );
  //   }

  //   if (endDate) {
  //     result = result.filter(
  //       (entry) => new Date(entry.dateCreated) <= new Date(endDate)
  //     );
  //   }

  //   if (status) {
  //     result = result.filter((entry) => entry.status === status);
  //   }

  //   setFilteredData(result);
  // };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Merchants</h1>
        <div className="flex gap-4">
          <FilterModal
            reportType="merchant"
            isOpen={showFilter}
            setIsOpen={setShowFilter}
            initialFilters={filters}
            onApply={(next) => setFilters(next)}
          />

          <Button onClick={() => router.push("/merchants/create-merchant")}>
            Create Merchant
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns(handleRowClick)}
        data={rows}
        searchableKeys={["id", "merchant", "contactPerson"]}
        searchPlaceholder="Search by ID, merchant, contact person"
      />
    </div>
  );
}
