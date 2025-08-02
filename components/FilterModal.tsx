// // components/FilterModal.tsx
// import { Role, roles } from "@/app/(dashboard)/audit-log/data";
// import React, { useState } from "react";
// import { PiFadersHorizontal } from "react-icons/pi";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";

// interface FilterModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onApply: (filters: {
//     startDate?: string;
//     endDate?: string;
//     role?: Role;
//   }) => void;
// }

// const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onApply }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [selectedRole, setSelectedRole] = useState<Role | "">("");

//   const handleApply = () => {
//     onApply({ startDate, endDate, role: selectedRole || undefined });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//           <PiFadersHorizontal className="inline mr-2" />
//           Filter
//         </button>
//       </DialogTrigger>
//       <DialogContent className="w-full max-w-md bg-white">
//         <DialogHeader>
//           <DialogTitle className="text-lg font-semibold">Filter</DialogTitle>
//           <DialogDescription> </DialogDescription>
//         </DialogHeader>
//         <div className="">
//           <label className="block text-sm font-medium">Start Date</label>
//           <input
//             type="date"
//             className="w-full border rounded p-2 mb-3 text-black"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />

//           <label className="block text-sm font-medium">End Date</label>
//           <input
//             type="date"
//             className="w-full border rounded p-2 mb-3"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />

//           <label className="block text-sm font-medium">Role</label>
//           <select
//             className="w-full border rounded p-2 mb-4"
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value as Role)}
//           >
//             <option value="">All Roles</option>
//             {roles.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>

//           <div className="flex justify-between">
//             <button className="bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200">
//               Cancel
//             </button>
//             <button
//               onClick={handleApply}
//               className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
//             >
//               Apply Filter
//             </button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FilterModal;

"use client";

import { Role, roles } from "@/app/(dashboard)/audit-log/data";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { PiFadersHorizontal } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    startDate?: string;
    endDate?: string;
    role?: Role;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onApply }) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedRole, setSelectedRole] = useState<Role | "">("");
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const handleApply = () => {
    onApply({
      startDate: startDate?.toISOString().split("T")[0],
      endDate: endDate?.toISOString().split("T")[0],
      role: selectedRole || undefined,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#FAF8FB] text-black px-4 py-2 rounded-xl">
          <PiFadersHorizontal className="inline mr-2" />
          Filter
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter</DialogTitle>
          <DialogDescription>
            Set filter criteria for your search.
          </DialogDescription>
        </DialogHeader>

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
                    {startDate ? format(startDate, "PPP") : "Pick a start date"}
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
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Popover open={endOpen} onOpenChange={setEndOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? format(endDate, "PPP") : "Pick an end date"}
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

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              className="w-full border rounded p-2"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200"
              onClick={() => {
                setStartDate(undefined);
                setEndDate(undefined);
                setSelectedRole("");
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
