// "use client";

// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/DataTable";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";
// import { financialTransactionColumns, ussdTransactionColumns } from "./columns";
// import { financialTransactions, ussdTransactions } from "./data";

// export default function TransactionsPage() {
//   const [open, setOpen] = useState(false);
//   const [startDate, setStartDate] = useState<Date | undefined>();
//   const [endDate, setEndDate] = useState<Date | undefined>();
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [selectedType, setSelectedType] = useState<string | null>(null);

//   const FilterButton = ({
//     label,
//     active,
//     onClick,
//   }: {
//     label: string;
//     active: boolean;
//     onClick: () => void;
//   }) => (
//     <button
//       className={`px-4 py-1 rounded-full border text-sm ${
//         active
//           ? "bg-purple-100 text-purple-900 border-purple-300"
//           : "bg-gray-100 text-gray-600 border-gray-200"
//       }`}
//       onClick={onClick}
//     >
//       {label}
//     </button>
//   );
//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">Transactions</h1>

//       <Tabs defaultValue="ussd" className="space-y-4 bg-[#FAF8FB] rounded-lg">
//         <TabsList className="w-fit bg-[#f4f4f5]">
//           <TabsTrigger
//             value="ussd"
//             className="data-[state=active]:bg-white data-[state=active]:text-primary"
//           >
//             USSD Sessions
//           </TabsTrigger>
//           <TabsTrigger
//             value="financial"
//             className="data-[state=active]:bg-white data-[state=active]:text-primary"
//           >
//             Financial Transactions
//           </TabsTrigger>
//         </TabsList>
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button variant="outline" className="ml-4">
//               Filter
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-sm">
//             <DialogHeader>
//               <DialogTitle>Filter</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Date Range</label>
//                 <div className="flex gap-2">
//                   <div className="relative">
//                     {/* Actual date input */}
//                     <input
//                       type="date"
//                       className="w-full bg-input border border-borderColor p-4 pr-10 outline-none text-text-primary appearance-none pl-4"
//                       {...field}
//                       onFocus={(e) => e.target.showPicker()}
//                     />

//                     {!field.value && (
//                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-primary pointer-events-none">
//                         Start Date
//                       </span>
//                     )}

//                     {field.value && (
//                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-primary pointer-events-none">
//                         {new Date(field.value).toLocaleDateString()}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Status</label>
//                 <div className="flex gap-2 flex-wrap">
//                   {["Successful", "Pending", "Failed"].map((status) => (
//                     <FilterButton
//                       key={status}
//                       label={status}
//                       active={selectedStatus === status}
//                       onClick={() => setSelectedStatus(status)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Transaction Type</label>
//                 <div className="flex gap-2 flex-wrap">
//                   {["Card", "Transfer", "Wallet"].map((type) => (
//                     <FilterButton
//                       key={type}
//                       label={type}
//                       active={selectedType === type}
//                       onClick={() => setSelectedType(type)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 pt-4">
//                 <Button variant="ghost" onClick={() => setOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={() => setOpen(false)}>Apply Filter</Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>

//         <TabsContent value="financial">
//           <DataTable
//             columns={financialTransactionColumns}
//             data={financialTransactions}
//             searchableKeys={["id", "merchantName"]}
//             searchPlaceholder="Search by ID, merchant name"
//           />
//         </TabsContent>

//         <TabsContent value="ussd">
//           <DataTable
//             columns={ussdTransactionColumns}
//             data={ussdTransactions}
//             searchableKeys={["id", "merchantName"]}
//             searchPlaceholder="Search by ID, merchant name"
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { financialTransactionColumns, ussdTransactionColumns } from "./columns";
import { financialTransactions, ussdTransactions } from "./data";

export default function TransactionsPage() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  console.log(startDate, endDate, selectedStatus, selectedType);

  const FilterButton = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      className={`px-4 py-1 rounded-full border text-sm ${
        active
          ? "bg-purple-100 text-purple-900 border-purple-300"
          : "bg-gray-100 text-gray-600 border-gray-200"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const formatDate = (date?: Date) =>
    date ? date.toISOString().split("T")[0] : "";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <Tabs defaultValue="ussd" className="space-y-4 bg-[#FAF8FB] rounded-lg">
        <TabsList className="w-fit bg-[#f4f4f5]">
          <TabsTrigger
            value="ussd"
            className="data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            USSD Sessions
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Financial Transactions
          </TabsTrigger>
        </TabsList>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-4">
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={formatDate(startDate)}
                    onChange={(e) =>
                      setStartDate(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                  <Input
                    type="date"
                    value={formatDate(endDate)}
                    onChange={(e) =>
                      setEndDate(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex gap-2 flex-wrap">
                  {["Successful", "Pending", "Failed"].map((status) => (
                    <FilterButton
                      key={status}
                      label={status}
                      active={selectedStatus === status}
                      onClick={() => setSelectedStatus(status)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Transaction Type</label>
                <div className="flex gap-2 flex-wrap">
                  {["Card", "Transfer", "Wallet"].map((type) => (
                    <FilterButton
                      key={type}
                      label={type}
                      active={selectedType === type}
                      onClick={() => setSelectedType(type)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Apply Filter</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <TabsContent value="financial">
          <DataTable
            columns={financialTransactionColumns}
            data={financialTransactions}
            searchableKeys={["id", "merchantName"]}
            searchPlaceholder="Search by ID, merchant name"
          />
        </TabsContent>

        <TabsContent value="ussd">
          <DataTable
            columns={ussdTransactionColumns}
            data={ussdTransactions}
            searchableKeys={["id", "merchantName"]}
            searchPlaceholder="Search by ID, merchant name"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
