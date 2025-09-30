// "use client";

// import { ApproveDialog } from "@/components/ApproveDialog";
// import { DeclineDialog } from "@/components/DeclineDialog";
// import { ResultDialog } from "@/components/ResultDialog";
// import { ShortCodeCard } from "@/components/ShortCodeCard";
// import { useState } from "react";

// const merchants = [
//   { merchant: "Merchant A", status: "Not Available", type: "Dedicated" },
//   { merchant: "Merchant B", status: "Available", type: "Shared" },
//   { merchant: "Merchant C", status: "Not Available", type: "Dedicated" },
//   { merchant: "Merchant D", status: "Available", type: "Dedicated" },
// ];

// export default function ShortCodeRequestsPage() {
//   const [selected, setSelected] = useState<any>(null);
//   const [showApprove, setShowApprove] = useState(false);
//   const [showDecline, setShowDecline] = useState(false);
//   const [resultMsg, setResultMsg] = useState("");

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold">Short Code Requests</h2>
//       <p className="text-muted-foreground mb-4">
//         Requests awaiting your review. Approve to move them forward or decline
//         with a reason.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {merchants.map((m, i) => (
//           <ShortCodeCard
//             key={i}
//             {...m}
//             onApprove={() => {
//               setSelected(m);
//               setShowApprove(true);
//             }}
//             onDecline={() => {
//               setSelected(m);
//               setShowDecline(true);
//             }}
//             status={m.status}
//             type={m.type}
//           />
//         ))}
//       </div>

//       <ApproveDialog
//         open={showApprove}
//         onClose={() => setShowApprove(false)}
//         onConfirm={() => {
//           setShowApprove(false);
//           setResultMsg("Request Approved Successfully");
//         }}
//       />

//       <DeclineDialog
//         open={showDecline}
//         onClose={() => setShowDecline(false)}
//         onConfirm={(reason) => {
//           console.log("Declined for reason:", reason);
//           setShowDecline(false);
//           setResultMsg("Request Declined Successfully");
//         }}
//       />

//       <ResultDialog
//         open={!!resultMsg}
//         onClose={() => setResultMsg("")}
//         message={resultMsg}
//       />
//     </div>
//   );
// }

"use client";

import { DataTable } from "@/components/ui/DataTable";
import React, { useState } from "react";
import { toast } from "sonner";
import { ShortCodeRequest, makeColumns } from "./columns";
import { requestData } from "./data";

export default function ShortCodeRequestsPage() {
  const [data, setData] = useState<ShortCodeRequest[]>(requestData);

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

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">
          Short Code Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Requests awaiting your review. Approve to move them forward or decline
          with a reason.
        </p>
      </header>
      <div className="[&>div>table>tbody>tr:nth-child(odd)]:bg-[#FBFCFF]">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
