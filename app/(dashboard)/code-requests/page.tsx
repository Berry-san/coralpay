"use client";

import { DataTable } from "@/components/ui/DataTable";
import { shortCodeColumns } from "./columns";
import { shortCodeData } from "./data";

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Configured Short Codes</h2>
      </div>

      <DataTable columns={shortCodeColumns} data={shortCodeData} />
    </div>
  );
}
