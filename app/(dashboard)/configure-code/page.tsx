// // "use client";

// // import { DataTable } from "@/components/ui/DataTable";
// // import React, { useState } from "react";
// // import { toast } from "sonner";
// // import { ShortCodeRequest, makeColumns } from "./columns";
// // import { requestData } from "./data";

// // export default function ShortCodeRequestsPage() {
// //   const [data, setData] = useState<ShortCodeRequest[]>(requestData);

// //   const handleAction = React.useCallback(
// //     (row: ShortCodeRequest, action: "accept" | "reject") => {
// //       setData((prev) =>
// //         prev.map((r) =>
// //           r.id === row.id
// //             ? {
// //                 ...r,
// //                 status: action === "accept" ? "Approved" : "Declined",
// //                 editable: action === "accept" ? false : r.editable,
// //               }
// //             : r
// //         )
// //       );
// //       toast.success(
// //         `${action === "accept" ? "Accepted" : "Rejected"} request ${row.id}`
// //       );
// //     },
// //     []
// //   );

// //   const columns = React.useMemo(
// //     () => makeColumns(handleAction),
// //     [handleAction]
// //   );

// //   return (
// //     <div className="space-y-6">
// //       <header>
// //         <h2 className="text-2xl font-bold tracking-tight">
// //           Short Code Requests
// //         </h2>
// //         <p className="text-sm text-muted-foreground mt-1">
// //           Requests awaiting your review. Approve to move them forward or decline
// //           with a reason.
// //         </p>
// //       </header>
// //       <div className="[&>div>table>tbody>tr:nth-child(odd)]:bg-[#FBFCFF]">
// //         <DataTable columns={columns} data={data} />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { DataTable } from "@/components/ui/DataTable";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import React from "react";
// import { toast } from "sonner";

// import { ShortCodeRequest, makeColumns } from "./columns";
// import { requestData } from "./data";

// /** Utility */
// const cn = (...cls: Array<string | false | null | undefined>) =>
//   cls.filter(Boolean).join(" ");

// type DeclineFlowStep = "closed" | "confirm" | "reason" | "success";

// export default function ShortCodeRequestsPage() {
//   const [data, setData] = React.useState<ShortCodeRequest[]>(requestData);

//   /** table row selection (TanStack pattern) */
//   const [rowSelection, setRowSelection] = React.useState<
//     Record<string, boolean>
//   >({});

//   /** decline flow state */
//   const [declineStep, setDeclineStep] =
//     React.useState<DeclineFlowStep>("closed");
//   const [declineReason, setDeclineReason] = React.useState("");

//   /** Approve/Reject a single row from row actions column */
//   const handleAction = React.useCallback(
//     (row: ShortCodeRequest, action: "accept" | "reject") => {
//       setData((prev) =>
//         prev.map((r) =>
//           r.id === row.id
//             ? {
//                 ...r,
//                 status: action === "accept" ? "Approved" : "Declined",
//                 editable: action === "accept" ? false : r.editable,
//               }
//             : r
//         )
//       );
//       toast.success(
//         `${action === "accept" ? "Accepted" : "Rejected"} request ${row.id}`
//       );
//     },
//     []
//   );

//   const columns = React.useMemo(
//     () => makeColumns(handleAction),
//     [handleAction]
//   );

//   /** Helper: ids of selected rows (requires getRowId below) */
//   const selectedIds = React.useMemo(
//     () => Object.keys(rowSelection).filter((k) => rowSelection[k]),
//     [rowSelection]
//   );

//   const hasSelection = selectedIds.length > 0;

//   /** Bulk Approve */
//   const handleBulkApprove = () => {
//     if (!hasSelection) return;
//     setData((prev) =>
//       prev.map((r) =>
//         selectedIds.includes(r.id)
//           ? { ...r, status: "Approved", editable: false }
//           : r
//       )
//     );
//     setRowSelection({});
//     toast.success(
//       `Approved ${selectedIds.length} request${
//         selectedIds.length > 1 ? "s" : ""
//       }`
//     );
//   };

//   /** Bulk Decline (2-step confirm -> reason -> success) */
//   const openDeclineFlow = () => {
//     if (!hasSelection) return;
//     setDeclineReason("");
//     setDeclineStep("confirm");
//   };

//   const proceedDeclineToReason = () => setDeclineStep("reason");

//   const confirmDeclineWithReason = () => {
//     setData((prev) =>
//       prev.map((r) =>
//         selectedIds.includes(r.id)
//           ? {
//               ...r,
//               status: "Declined",
//               // If you store reason on the row, you can add it here:
//               // declineReason,
//             }
//           : r
//       )
//     );
//     setRowSelection({});
//     setDeclineStep("success");
//   };

//   const closeDeclineFlow = () => setDeclineStep("closed");

//   return (
//     <div className="space-y-6">
//       <header className="flex items-start justify-between">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">
//             Short Code Requests
//           </h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             Requests awaiting your review. Approve to move them forward or
//             decline with a reason.
//           </p>
//         </div>

//         {/* Bulk Actions */}
//         <div className="flex gap-3">
//           <Button
//             type="button"
//             variant="secondary"
//             className={cn(
//               "  px-5",
//               !hasSelection && "opacity-50 pointer-events-none"
//             )}
//             onClick={openDeclineFlow}
//           >
//             Decline Request
//           </Button>

//           <Button
//             type="button"
//             className={cn(
//               "  px-5 bg-[#4B006E] hover:bg-[#3e005c]",
//               !hasSelection && "opacity-50 pointer-events-none"
//             )}
//             onClick={handleBulkApprove}
//           >
//             Approve Request
//           </Button>
//         </div>
//       </header>

//       {/* Table */}
//       <div className="[&>div>table>tbody>tr:nth-child(odd)]:bg-[#FBFCFF]">
//         <DataTable
//           columns={columns}
//           data={data}
//           /** Typical TanStack + ShadCN DataTable API */
//           getRowId={(row: ShortCodeRequest) => row.id}
//           enableRowSelection
//           rowSelection={rowSelection}
//           onRowSelectionChange={setRowSelection}
//           /** If your DataTable uses a different API, map these four props accordingly. */
//         />
//       </div>

//       {/* Decline Flow – Step 1: Confirm */}
//       <Dialog open={declineStep === "confirm"} onOpenChange={closeDeclineFlow}>
//         <DialogContent className="sm:max-w-md rounded-2xl">
//           <DialogHeader className="items-center">
//             <div className="grid place-items-center mt-2">
//               {/* Info dot */}
//               <div className="h-10 w-10   bg-purple-100 grid place-items-center">
//                 <span className="text-purple-700 text-lg">i</span>
//               </div>
//             </div>
//             <DialogTitle className="text-center">
//               Are You Sure You Want to Decline This?
//             </DialogTitle>
//             <DialogDescription className="text-center">
//               {selectedIds.length} request{selectedIds.length > 1 ? "s" : ""}{" "}
//               will be marked as declined and the requester will be notified.
//               This action can’t be undone.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="grid grid-cols-2 gap-3 mt-2">
//             <Button
//               variant="secondary"
//               className=" "
//               onClick={closeDeclineFlow}
//             >
//               Cancel
//             </Button>
//             <Button
//               className="  bg-[#4B006E] hover:bg-[#3e005c]"
//               onClick={proceedDeclineToReason}
//             >
//               Yes, Proceed
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Decline Flow – Step 2: Reason */}
//       <Dialog open={declineStep === "reason"} onOpenChange={closeDeclineFlow}>
//         <DialogContent className="sm:max-w-lg rounded-2xl">
//           <DialogHeader>
//             <DialogTitle>Provide your reason for declining.</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Reason</label>
//             <Textarea
//               placeholder="Enter your reason"
//               value={declineReason}
//               onChange={(e) => setDeclineReason(e.target.value)}
//               className="min-h-28"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-3 mt-4">
//             <Button
//               variant="secondary"
//               className=" "
//               onClick={closeDeclineFlow}
//             >
//               Cancel
//             </Button>
//             <Button
//               className={cn(
//                 "  bg-[#4B006E] hover:bg-[#3e005c]",
//                 !declineReason.trim() && "opacity-50 pointer-events-none"
//               )}
//               onClick={confirmDeclineWithReason}
//             >
//               Confirm
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Decline Flow – Step 3: Success */}
//       <Dialog open={declineStep === "success"} onOpenChange={closeDeclineFlow}>
//         <DialogContent className="sm:max-w-md rounded-2xl">
//           <DialogHeader className="items-center">
//             <div className="grid place-items-center mt-2">
//               {/* Check dot */}
//               <div className="h-10 w-10   bg-blue-100 grid place-items-center">
//                 <span className="text-blue-700 text-lg">✓</span>
//               </div>
//             </div>
//             <DialogTitle className="text-center">
//               Request Declined successfully
//             </DialogTitle>
//             <DialogDescription className="text-center">
//               The request{selectedIds.length > 1 ? "s have" : " has"} been
//               marked as declined and removed from the active queue. The Merchant
//               will be notified.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="mt-2">
//             <Button
//               className="w-full   bg-[#4B006E] hover:bg-[#3e005c]"
//               onClick={closeDeclineFlow}
//             >
//               Okay
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import React from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { ShortCodeRequest, makeColumns } from "./columns";
import { requestData } from "./data";

type DeclineStep = "closed" | "confirm" | "reason" | "success";
type ApproveStep = "closed" | "confirm" | "success";

const purple = "bg-[#4B006E] hover:bg-[#3e005c]";

export default function ShortCodeRequestsPage() {
  const [data, setData] = React.useState<ShortCodeRequest[]>(requestData);

  // Selection state (controlled)
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState<ShortCodeRequest[]>(
    []
  );

  // Decline flow
  const [declineStep, setDeclineStep] = React.useState<DeclineStep>("closed");
  const [declineReason, setDeclineReason] = React.useState("");

  // Approve flow
  const [approveStep, setApproveStep] = React.useState<ApproveStep>("closed");

  const hasSelection = selectedRows.length > 0;

  /** Single-row action coming from columns.ts */
  const handleAction = React.useCallback(
    (row: ShortCodeRequest, action: "accept" | "reject") => {
      setData((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? {
                ...r,
                status: action === "accept" ? "Approved" : "Declined",
                editable: action === "accept" ? false : r.editable,
              }
            : r
        )
      );
      toast.success(
        `${action === "accept" ? "Accepted" : "Rejected"} request ${row.id}`
      );
    },
    []
  );

  const columns = React.useMemo(
    () => makeColumns(handleAction),
    [handleAction]
  );

  /** -------- Bulk Approve Flow -------- */
  const openApprove = () => {
    if (!hasSelection) return;
    setApproveStep("confirm");
  };

  const confirmApprove = () => {
    const ids = new Set(selectedRows.map((r) => r.id));
    setData((prev) =>
      prev.map((r) =>
        ids.has(r.id) ? { ...r, status: "Approved", editable: false } : r
      )
    );
    setRowSelection({});
    setApproveStep("success");
  };

  const closeApprove = () => setApproveStep("closed");

  /** -------- Bulk Decline Flow -------- */
  const openDecline = () => {
    if (!hasSelection) return;
    setDeclineReason("");
    setDeclineStep("confirm");
  };

  const goToReason = () => setDeclineStep("reason");

  const confirmDecline = () => {
    const ids = new Set(selectedRows.map((r) => r.id));
    setData((prev) =>
      prev.map((r) =>
        ids.has(r.id)
          ? {
              ...r,
              status: "Declined",
              // declineReason, // attach if your model supports it
            }
          : r
      )
    );
    setRowSelection({});
    setDeclineStep("success");
  };

  const closeDecline = () => setDeclineStep("closed");

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Short Code Requests
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Requests awaiting your review. Approve to move them forward or
            decline with a reason.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className={`${
              !hasSelection ? "opacity-50 pointer-events-none" : ""
            } px-5`}
            onClick={openDecline}
          >
            Decline Request
          </Button>
          <Button
            type="button"
            className={`${purple} ${
              !hasSelection ? "opacity-50 pointer-events-none" : ""
            } px-5`}
            onClick={openApprove}
          >
            Approve Request
          </Button>
        </div>
      </header>

      <div className="[&>div>table>tbody>tr:nth-child(odd)]:bg-[#FBFCFF]">
        <DataTable<ShortCodeRequest, any>
          columns={columns}
          data={data}
          enableRowSelection
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => row.id}
          onSelectedRowsChange={setSelectedRows}
        />
      </div>

      {/* -------- Approve – Confirm -------- */}
      <Dialog open={approveStep === "confirm"} onOpenChange={closeApprove}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="items-center">
            <div className="grid place-items-center mt-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 grid place-items-center">
                <span className="text-purple-700 text-lg">i</span>
              </div>
            </div>
            <DialogTitle className="text-center">
              Proceeding with Approval?
            </DialogTitle>
            <DialogDescription className="text-center">
              This action will mark {selectedRows.length} request
              {selectedRows.length > 1 ? "s" : ""} as approved and notify the
              Merchant.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button variant="secondary" onClick={closeApprove}>
              Cancel
            </Button>
            <Button className={purple} onClick={confirmApprove}>
              Yes, Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* -------- Approve – Success -------- */}
      <Dialog open={approveStep === "success"} onOpenChange={closeApprove}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="items-center">
            <div className="grid place-items-center mt-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 grid place-items-center">
                <span className="text-blue-700 text-lg">✓</span>
              </div>
            </div>
            <DialogTitle className="text-center">
              Request Approved Successfully
            </DialogTitle>
            <DialogDescription className="text-center">
              Approval confirmed. Merchant will be notified.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <Button className={`w-full ${purple}`} onClick={closeApprove}>
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* -------- Decline – Confirm -------- */}
      <Dialog open={declineStep === "confirm"} onOpenChange={closeDecline}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="items-center">
            <div className="grid place-items-center mt-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 grid place-items-center">
                <span className="text-purple-700 text-lg">i</span>
              </div>
            </div>
            <DialogTitle className="text-center">
              Are You Sure You Want to Decline This?
            </DialogTitle>
            <DialogDescription className="text-center">
              {selectedRows.length} request{selectedRows.length > 1 ? "s" : ""}{" "}
              will be marked as declined and the requester will be notified.
              This action can’t be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button variant="secondary" onClick={closeDecline}>
              Cancel
            </Button>
            <Button className={purple} onClick={goToReason}>
              Yes, Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* -------- Decline – Reason -------- */}
      <Dialog open={declineStep === "reason"} onOpenChange={closeDecline}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Provide your reason for declining.</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <Textarea
              placeholder="Enter your reason"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="min-h-28"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button variant="secondary" onClick={closeDecline}>
              Cancel
            </Button>
            <Button
              className={`${purple} ${
                !declineReason.trim() ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={confirmDecline}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* -------- Decline – Success -------- */}
      <Dialog open={declineStep === "success"} onOpenChange={closeDecline}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="items-center">
            <div className="grid place-items-center mt-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 grid place-items-center">
                <span className="text-blue-700 text-lg">✓</span>
              </div>
            </div>
            <DialogTitle className="text-center">
              Request Declined successfully
            </DialogTitle>
            <DialogDescription className="text-center">
              The selected request{selectedRows.length > 1 ? "s have" : " has"}{" "}
              been marked as declined and removed from the active queue. The
              Merchant will be notified.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <Button className={`w-full ${purple}`} onClick={closeDecline}>
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
