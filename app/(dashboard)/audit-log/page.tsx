"use client";

import FilterModal from "@/components/FilterModal";
import SearchInput from "@/components/SearchInput";
import { DataTable } from "@/components/ui/DataTable";
import { applyReportFilters, ReportFilters } from "@/lib/filter";
import { useMemo, useState } from "react";
import { columns } from "./column";
import { auditLogData, AuditLogEntry } from "./data";

const AuditLog = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: "merchant",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchableFields = ["userName", "ip"];

  const rows = useMemo(() => {
    const filteredByReport = applyReportFilters<AuditLogEntry>(
      auditLogData,
      filters
    );

    if (searchQuery.trim() === "") {
      return filteredByReport;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return filteredByReport.filter((entry) =>
      searchableFields.some((field) => {
        const value = entry[field as keyof AuditLogEntry];

        return (
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseQuery)
        );
      })
    );
  }, [auditLogData, filters, searchQuery]);

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row space-y-4 justify-between items-start md:items-center mb-4">
        <h1 className="text-xl font-semibold">Audit Log</h1>
        <div className="flex gap-4 items-center">
          <SearchInput
            onSearch={setSearchQuery}
            placeholder="Search audit logs..."
          />
          <FilterModal
            reportType="audit"
            isOpen={showFilter}
            setIsOpen={setShowFilter}
            initialFilters={filters}
            onApply={(next) => setFilters(next)}
          />
        </div>
      </div>
      <div className="">
        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  );
};

export default AuditLog;
