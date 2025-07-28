"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { columns } from "./columns";
import { merchants } from "./data";

export default function MerchantPage() {
  const router = useRouter();

  // Memoized data to ensure stability
  const data = useMemo(() => merchants, []);

  const handleRowClick = (merchantId: string) => {
    router.push(`/merchants/${merchantId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Merchants</h1>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/merchants/create-merchant")}>
            Create Merchant
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns(handleRowClick)}
        data={data}
        searchableKeys={["id", "merchant", "contactPerson"]}
        searchPlaceholder="Search by ID, merchant, contact person"
      />
    </div>
  );
}
