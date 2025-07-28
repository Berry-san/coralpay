// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ColumnDef } from "@tanstack/react-table";
// import { Pencil } from "lucide-react";
// import { useState } from "react";

// interface Merchant {
//   id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   merchantName: string;
// }

// export const columns: ColumnDef<Merchant>[] = [
//   {
//     accessorKey: "id",
//     header: "User ID",
//     cell: ({ row }) => <span>{row.original.id}</span>,
//   },
//   {
//     accessorKey: "fullName",
//     header: "Full Name",
//     cell: ({ row }) => <span>{row.original.fullName}</span>,
//   },
//   {
//     accessorKey: "email",
//     header: "Email Address",
//     cell: ({ row }) => {
//       const email = row.original.email;
//       const maskedEmail = email.replace(/(?<=.{2}).(?=.*@)/g, "*");
//       return <span>{maskedEmail}</span>;
//     },
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone Number",
//     cell: ({ row }) => {
//       const phone = row.original.phone;
//       const maskedPhone = phone.replace(/.(?=.{3})/g, "*");
//       return <span>{maskedPhone}</span>;
//     },
//   },
//   {
//     accessorKey: "address",
//     header: "Address",
//     cell: ({ row }) => {
//       const { address, city } = row.original;
//       return (
//         <div className="flex flex-col">
//           <span>{address}</span>
//           <span className="text-muted-foreground text-xs">{city}</span>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "merchantName",
//     header: "Merchant Name",
//     cell: ({ row }) => <span>{row.original.merchantName}</span>,
//   },
//   {
//     id: "actions",
//     header: "Action",
//     cell: ({ row }) => {
//       const [open, setOpen] = useState(false);
//       return (
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button size="icon" variant="ghost">
//               <Pencil className="w-4 h-4" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-48">
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 // openEditModal(row.original); // If you have edit logic
//                 console.log("Edit Contact Person:", row.original.id);
//               }}
//               className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
//             >
//               Edit Contact Person
//             </button>
//           </PopoverContent>
//         </Popover>
//       );
//     },
//   },
// ];

// columns.ts
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";

export type Merchant = {
  id: string;
  merchant: string;
  contactPerson: string;
  dateCreated: string;
  status: "Active" | "Inactive";
};

export const columns = (
  onRowClick: (id: string) => void
): ColumnDef<Merchant>[] => [
  {
    accessorKey: "id",
    header: "Merchant ID",
    cell: ({ row }) => (
      <span
        className="cursor-pointer font-medium"
        onClick={() => onRowClick(row.original.id)}
      >
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "merchant",
    header: "Merchants",
    cell: ({ row }) => (
      <span
        className="cursor-pointer"
        onClick={() => onRowClick(row.original.id)}
      >
        {row.getValue("merchant")}
      </span>
    ),
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "Active" | "Inactive";
      return (
        <Badge
          className={`${
            status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-600"
          } px-2 py-1 rounded-full text-xs`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <Button variant="ghost" size="icon">
        <PencilIcon className="w-4 h-4 text-muted-foreground" />
      </Button>
    ),
  },
];
