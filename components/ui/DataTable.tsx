"use client";

import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../Pagination/Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableKeys?: (keyof TData)[];
  searchPlaceholder?: string;
  exportable?: boolean;
  extraElement?: React.ReactNode;
}

export function DataTable<TData extends Record<string, any>, TValue>({
  columns,
  data,
  searchableKeys = [],
  searchPlaceholder = "Search by name...",
  // exportable = false
  extraElement,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [search, setSearch] = React.useState("");

  const globalFilterFn: FilterFn<TData> = (row, columnId, filterValue) => {
    if (!searchableKeys.includes(columnId as keyof TData)) return false;
    const value = row.getValue(columnId);
    return String(value ?? "")
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  };

  const allColumns = [
    {
      id: "checkbox",
      header: () => (
        <input type="checkbox" className="w-3 h-3 accent-primary" readOnly />
      ),
      cell: () => (
        <input type="checkbox" className="w-3 h-3 accent-primary" readOnly />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setSearch,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter: search,
    },
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const pageIndex = table.getState().pagination.pageIndex;
  const start = pageIndex * pageSize + 1;
  const end = Math.min(
    start + pageSize - 1,
    table.getFilteredRowModel().rows.length
  );
  const total = table.getFilteredRowModel().rows.length;

  return (
    <div className="w-full">
      {/* <div className="flex items-center justify-between py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-2">
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            {extraElement}
          </div>
        </div>
      </div> */}

      <div className="overflow-auto rounded-xl border border-[#F9F9F9]">
        <Table>
          <TableHeader className="sticky top-0 bg-[#FCFDFD] z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="text-[#00328B] font-bold"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // className="h-[56px] text-tableGray"
                  className={`h-[56px] ${
                    index % 2 === 0 ? "bg-[#FAFCFF]" : "bg-[#FFFFFF]"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-x-2 py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="text-muted-foreground text-sm">
            Showing {start}–{end} of {total}
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {total > pageSize && (
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalCount={table.getFilteredRowModel().rows.length}
            pageSize={pageSize}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        )}
        {/* <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
