"use client";

import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./column";
import { merchantData } from "./data";

export default function UsersPage() {
  return (
    <DataTable
      columns={columns}
      data={merchantData}
      searchableKeys={["fullName", "email"]}
    />
  );
}
