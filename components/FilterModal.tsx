"use client";

import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { PiFadersHorizontal } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Centralised filter logic/types
import { Role, roles } from "@/app/(dashboard)/audit-log/data";
import {
  isValidDateRangeDates,
  ReportFilters,
  ReportType,
  STATUS_OPTIONS,
  toISODate,
} from "@/lib/filter";

type FilterModalProps = {
  /** Which report's filters to render */
  reportType: ReportType;

  /** Modal open state controlled by parent */
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;

  /** Initial values to hydrate the modal when opened (optional) */
  initialFilters?: Partial<ReportFilters>;

  /** Emit normalized filters (strings for dates, arrays for statuses/types) */
  onApply: (filters: ReportFilters) => void;

  /** Optional callback when closing (side-effects, telemetry, etc.) */
  onClose?: () => void;

  /** Provide type options for transaction/ussd */
  typeOptions?: string[];

  showTriggerButton?: boolean;
};

const DEFAULT_TYPE_OPTIONS = ["Card", "Transfer", "Wallet"];

const FilterModal: React.FC<FilterModalProps> = ({
  reportType,
  isOpen,
  setIsOpen,
  initialFilters,
  onApply,
  onClose,
  typeOptions = DEFAULT_TYPE_OPTIONS,
  showTriggerButton = true,
}) => {
  // Local (temporary) state while the modal is open
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [role, setRole] = useState<Role | "">("");
  const [statuses, setStatuses] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // Hydrate when opening or when parent supplies new initial filters
  useEffect(() => {
    const s = (initialFilters as any)?.startDate;
    const e = (initialFilters as any)?.endDate;
    const r = (initialFilters as any)?.role;
    const st = (initialFilters as any)?.status;
    const ty = (initialFilters as any)?.types;

    setStartDate(s ? new Date(s) : undefined);
    setEndDate(e ? new Date(e) : undefined);
    setRole((reportType === "audit" && r) || "");
    setStatuses(Array.isArray(st) ? st : []);
    setTypes(Array.isArray(ty) ? ty : []);
  }, [isOpen, initialFilters, reportType]);

  const statusOptions = useMemo(
    () => STATUS_OPTIONS[reportType] || [],
    [reportType]
  );

  // Validation: Start must be ≤ End (only when both are set)
  const invalidRange = !isValidDateRangeDates(startDate, endDate);

  const handleApply = () => {
    if (invalidRange) return;

    const base = {
      reportType,
      startDate: toISODate(startDate),
      endDate: toISODate(endDate),
    };

    let next: ReportFilters;
    if (reportType === "audit") {
      next = { ...base, reportType, role: role || undefined } as ReportFilters;
    } else if (reportType === "transaction" || reportType === "ussd") {
      next = {
        ...base,
        reportType,
        status: statuses.length ? (statuses as any) : undefined,
        types: types.length ? types : undefined,
      } as ReportFilters;
    } else {
      next = {
        ...base,
        reportType,
        status: statuses.length ? (statuses as any) : undefined,
      } as ReportFilters;
    }

    onApply(next);
    setIsOpen(false);
    onClose?.();
  };

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setRole("");
    setStatuses([]);
    setTypes([]);
  };

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {showTriggerButton && (
        <DialogTrigger asChild>
          <button className="bg-[#FAF8FB] text-black px-4 py-2 flex items-center justify-center rounded-xl">
            <PiFadersHorizontal className="inline mr-2" />
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </DialogTrigger>
      )}

      <DialogContent className=" max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter</DialogTitle>
          <DialogDescription>Set filter criteria.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Date range */}
          <div className="grid grid-cols-2 gap-2 w-full">
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
                      !startDate && "text-muted-foreground",
                      invalidRange && "border-red-500"
                    )}
                    aria-invalid={invalidRange ? true : undefined}
                  >
                    {startDate ? format(startDate, "PPP") : "Pick a start date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    disabled={endDate ? { after: endDate } : undefined}
                    onSelect={(date) => {
                      setStartDate(date || undefined);
                      setStartOpen(false);
                    }}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Popover open={endOpen} onOpenChange={setEndOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                      invalidRange && "border-red-500"
                    )}
                    aria-invalid={invalidRange ? true : undefined}
                  >
                    {endDate ? format(endDate, "PPP") : "Pick an end date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    disabled={startDate ? { before: startDate } : undefined}
                    onSelect={(date) => {
                      setEndDate(date || undefined);
                      setEndOpen(false);
                    }}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {invalidRange && (
            <p className="text-sm text-red-600">
              Start date must be earlier than or equal to End date.
            </p>
          )}

          {/* Role (Audit only) */}
          {reportType === "audit" && (
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                className={cn(
                  "w-full border rounded p-2",
                  invalidRange && "border-red-500"
                )}
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="">All Roles</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status (multi) for non-audit reports */}
          {reportType !== "audit" && statusOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={statuses.includes(opt.value)}
                      onChange={() => toggle(setStatuses, opt.value)}
                      className="accent-purple-700"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>

              {statuses.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      {statusOptions.find((o) => o.value === s)?.label ?? s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Type (multi) for transaction/ussd */}
          {(reportType === "transaction" || reportType === "ussd") && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Transaction Type
              </label>
              <div className="flex gap-2 flex-wrap">
                {typeOptions.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={types.includes(t)}
                      onChange={() => toggle(setTypes, t)}
                      className="accent-purple-700"
                    />
                    <span className="text-sm">{t}</span>
                  </label>
                ))}
              </div>

              {types.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {types.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-2">
            <Button
              className="bg-gray-100 text-gray-800 px-4 py-2 hover:bg-gray-200"
              onClick={handleReset}
              title="Clear all filters"
            >
              Reset
            </Button>

            <div className="flex gap-2">
              <Button
                className="bg-purple-100 text-purple-800 px-4 py-2 hover:bg-purple-200"
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleApply}
                className={cn(
                  "px-4 py-2 text-white",
                  invalidRange && "bg-purple-300 cursor-not-allowed"
                )}
                disabled={invalidRange}
                aria-disabled={invalidRange}
              >
                Apply Filter
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
