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

import { ApproveDialog } from "@/components/ApproveDialog";
import { DeclineDialog } from "@/components/DeclineDialog";
import { ResultDialog } from "@/components/ResultDialog";
import { ShortCodeCard } from "@/components/ShortCodeCard";
import { useState } from "react";

interface MerchantRequest {
  id: string;
  merchant: string;
  status: "Available" | "Not Available";
  type: "Dedicated" | "Shared";
}

const initialRequests: MerchantRequest[] = [
  {
    id: "1",
    merchant: "Merchant A",
    status: "Not Available",
    type: "Dedicated",
  },
  { id: "2", merchant: "Merchant B", status: "Available", type: "Shared" },
  {
    id: "3",
    merchant: "Merchant C",
    status: "Not Available",
    type: "Dedicated",
  },
  { id: "4", merchant: "Merchant D", status: "Available", type: "Dedicated" },
  { id: "5", merchant: "Merchant E", status: "Not Available", type: "Shared" },
  { id: "6", merchant: "Merchant F", status: "Available", type: "Dedicated" },
];

export default function ShortCodeRequestsPage() {
  const [requests, setRequests] = useState<MerchantRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] =
    useState<MerchantRequest | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleApprove = (request: MerchantRequest) => {
    setSelectedRequest(request);
    setShowApprove(true);
  };

  const handleDecline = (request: MerchantRequest) => {
    setSelectedRequest(request);
    setShowDecline(true);
  };

  const confirmApproval = () => {
    if (!selectedRequest) return;
    setRequests((prev) => prev.filter((req) => req.id !== selectedRequest.id));
    setShowApprove(false);
    setResultMessage("Request Approved Successfully");
  };

  const confirmDecline = (reason: string) => {
    if (!selectedRequest) return;
    console.log("Decline reason:", reason);
    setRequests((prev) => prev.filter((req) => req.id !== selectedRequest.id));
    setShowDecline(false);
    setResultMessage("Request Declined Successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">
          Short Code Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Requests awaiting your review. Approve to move them forward or decline
          with a reason.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {requests.map((req) => (
          <ShortCodeCard
            key={req.id}
            merchant={req.merchant}
            status={req.status}
            type={req.type}
            onApprove={() => handleApprove(req)}
            onDecline={() => handleDecline(req)}
          />
        ))}
      </div>

      {/* Approve Confirmation Dialog */}
      <ApproveDialog
        open={showApprove}
        onClose={() => setShowApprove(false)}
        onConfirm={confirmApproval}
      />

      {/* Decline Reason Dialog */}
      <DeclineDialog
        open={showDecline}
        onClose={() => setShowDecline(false)}
        onConfirm={confirmDecline}
      />

      {/* Final Result Dialog */}
      <ResultDialog
        open={!!resultMessage}
        onClose={() => setResultMessage("")}
        message={resultMessage}
      />
    </div>
  );
}
