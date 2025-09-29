"use client";

import FilterModal from "@/components/FilterModal";
import { InviteUserModal } from "@/components/InviteUserModal";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { applyReportFilters, ReportFilters } from "@/lib/filter";
import { useMemo, useState } from "react";
import { columns, User } from "./columns";
import { users } from "./data";

export default function UsersPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: "merchant",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchableFields = ["fullName", "email"];

  const rows = useMemo(() => {
    const filteredByReport = applyReportFilters<User>(users, filters);

    if (searchQuery.trim() === "") {
      return filteredByReport;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return filteredByReport.filter((entry) =>
      searchableFields.some((field) => {
        const value = entry[field as keyof User];

        return (
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseQuery)
        );
      })
    );
  }, [users, filters, searchQuery]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Users</h2>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <SearchInput
            onSearch={setSearchQuery}
            placeholder="Search by name or email..."
          />
          <FilterModal
            reportType="user"
            isOpen={showFilter}
            setIsOpen={setShowFilter}
            initialFilters={filters}
            onApply={(next) => setFilters(next)}
          />
        </div>
        <Button
          onClick={() => setInviteModalOpen(true)}
          className="bg-primary text-white "
        >
          Invite User
        </Button>
      </div>

      <DataTable columns={columns} data={rows} />

      <InviteUserModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
}
