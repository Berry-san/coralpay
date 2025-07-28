// components/FilterModal.tsx
import { Role, roles } from "@/app/(dashboard)/audit-log/data";
import React, { useState } from "react";
import { PiFadersHorizontal } from "react-icons/pi";
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | "">("");

  const handleApply = () => {
    onApply({ startDate, endDate, role: selectedRole || undefined });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          <PiFadersHorizontal className="inline mr-2" />
          Filter
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter</DialogTitle>
          <DialogDescription> </DialogDescription>
        </DialogHeader>
        <div className="">
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="w-full border rounded p-2 mb-3 text-black"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            className="w-full border rounded p-2 mb-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label className="block text-sm font-medium">Role</label>
          <select
            className="w-full border rounded p-2 mb-4"
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

          <div className="flex justify-between">
            <button className="bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200">
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
