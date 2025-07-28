"use client";

import FilterModal from "@/components/FilterModal";
import { DataTable } from "@/components/ui/DataTable";
import { useState } from "react";
import { columns } from "./column";
import { auditLogData, AuditLogEntry, Role } from "./data";

const AuditLog = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] =
    useState<AuditLogEntry[]>(auditLogData);

  const handleApplyFilter = ({
    startDate,
    endDate,
    role,
  }: {
    startDate?: string;
    endDate?: string;
    role?: Role;
  }) => {
    let result = [...auditLogData];

    if (startDate) {
      result = result.filter(
        (entry) => new Date(entry.timestamp) >= new Date(startDate)
      );
    }

    if (endDate) {
      result = result.filter(
        (entry) => new Date(entry.timestamp) <= new Date(endDate)
      );
    }

    if (role) {
      result = result.filter((entry) => entry.role === role);
    }

    setFilteredData(result);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Audit Log</h1>
        <FilterModal
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilter}
        />
      </div>

      <div className="">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default AuditLog;
