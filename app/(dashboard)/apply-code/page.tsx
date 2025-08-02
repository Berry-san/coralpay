"use client";

import { ApplyShortCodeDialog } from "@/components/short-code-application/ShortCodeApplication";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { useState } from "react";
import { columns } from "./columns";
import { shortCodeTableData } from "./data";

export default function ShortCodePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container py-10">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-xl font-semibold">Short Code</p>
        <Button onClick={() => setOpen(true)}>Apply for short code</Button>
      </div>

      <p className="text-sm mb-4 text-muted-foreground">
        Requests awaiting your review. Approve to move them forward or decline
        with a reason.
      </p>

      <div className="">
        <DataTable columns={columns} data={shortCodeTableData} />
      </div>

      <ApplyShortCodeDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
