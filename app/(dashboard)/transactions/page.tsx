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
import { Calendar } from "@/components/ui/calendar";
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
import { downloadCSV, downloadPDF } from "@/lib/table-export-utils";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { PiFadersHorizontal } from "react-icons/pi";
import { financialTransactionColumns, ussdTransactionColumns } from "./columns";
import { financialTransactions, ussdTransactions } from "./data";

export default function TransactionsPage() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  console.log(startDate, endDate, selectedStatus, selectedType);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = ussdTransactions.filter((item) => {
    const matchesSearch =
      item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.merchantName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus
      ? item.status === selectedStatus
      : true;

    const matchesType = selectedType ? item.ussd === selectedType : true;

    const matchesDateRange =
      (!startDate || new Date(item.date) >= startDate) &&
      (!endDate || new Date(item.date) <= endDate);

    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

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

  const handleExportPDF = () => {
    downloadPDF(filteredData);
  };

  const handleExportCSV = () => {
    downloadCSV(filteredData);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <button className="bg-[#FAF8FB] text-black px-4 py-2 rounded-xl w-fit flex items-center gap-2">
            <PiFadersHorizontal className="inline " />
            Filter
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleExportCSV}>Export CSV</Button>
          <Button onClick={handleExportPDF}>Export PDF</Button>
        </div>
      </div>

      <Tabs defaultValue="ussd" className="space-y-4 rounded-lg">
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
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {/* Start Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <Popover open={startOpen} onOpenChange={setStartOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            {startDate
                              ? format(startDate, "PPP")
                              : "Pick a start date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => {
                              setStartDate(date);
                              setStartOpen(false); // Close popover
                            }}
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* End Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <Popover open={endOpen} onOpenChange={setEndOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            {endDate
                              ? format(endDate, "PPP")
                              : "Pick an end date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date) => {
                              setEndDate(date);
                              setEndOpen(false); // Close popover
                            }}
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
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
            data={filteredData}
            searchableKeys={["id", "merchantName"]}
            searchPlaceholder="Search by ID, merchant name"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
