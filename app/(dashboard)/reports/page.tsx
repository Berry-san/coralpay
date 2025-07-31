"use client";

import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./columns";
import { ussdReports } from "./data";

const ReportsPage = () => {
  //   const [showFilter, setShowFilter] = useState(false);
  //   const [filteredData, setFilteredData] =
  //     useState<AuditLogEntry[]>(auditLogData);

  //   const handleApplyFilter = ({
  //     startDate,
  //     endDate,
  //     role,
  //   }: {
  //     startDate?: string;
  //     endDate?: string;
  //     role?: Role;
  //   }) => {
  //     let result = [...auditLogData];

  //     if (startDate) {
  //       result = result.filter(
  //         (entry) => new Date(entry.timestamp) >= new Date(startDate)
  //       );
  //     }

  //     if (endDate) {
  //       result = result.filter(
  //         (entry) => new Date(entry.timestamp) <= new Date(endDate)
  //       );
  //     }

  //     if (role) {
  //       result = result.filter((entry) => entry.role === role);
  //     }

  //     setFilteredData(result);
  //   };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Reports</h1>
        {/* <FilterModal
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilter}
        /> */}
      </div>

      <div className="">
        <DataTable columns={columns} data={ussdReports} />
      </div>
    </div>
  );
};

export default ReportsPage;
