// columns.ts
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  lastActive: string;
  status: "Active" | "Inactive" | "Pending";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => {
      const email: string = row.getValue("email");
      const maskedEmail = email.replace(/(.{4}).+(@.*)/, "$1***$2");
      return <span>{maskedEmail}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as User["status"];
      const badgeColor =
        status === "Active"
          ? "bg-green-100 text-green-800"
          : status === "Inactive"
          ? "bg-gray-100 text-gray-800"
          : "bg-yellow-100 text-yellow-800";

      return (
        <Badge className={`${badgeColor} px-3 py-1 rounded-full text-xs`}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <PencilIcon className="h-4 w-4 text-purple-700" />
      </Button>
    ),
  },
];
