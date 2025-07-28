"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AuditLogEntry } from "./data";

export const columns: ColumnDef<AuditLogEntry>[] = [
  {
    header: "User",
    accessorKey: "userName",
    cell: ({ row }) => <span className="text-sm">{row.original.userName}</span>,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => <span className="text-sm">{row.original.role}</span>,
  },
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    cell: ({ row }) => {
      const date = new Date(row.original.timestamp);
      return (
        <span className="text-sm">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <span className="capitalize text-sm font-medium text-blue-600">
        {row.original.action}
      </span>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.description}</span>
    ),
  },
  {
    header: "IP Address",
    accessorKey: "ipAddress",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">{row.original.ipAddress}</span>
    ),
  },
];
