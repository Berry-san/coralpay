"use client";

import { ConnectedAccounts } from "@/components/ConnectedAccounts";
import { PermissionMatrix } from "@/components/PermissionMatrix";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const dummyPermissions = {
  Dashboard: { View: true },
  "Merchant list": {},
  "Contact Persons": { View: true, Create: true, Edit: true, Delete: true },
  "Admin Set up": {},
  Transactions: { View: true, Create: true },
  Reports: {},
  "Audit Log": {},
  "Short Codes": { View: true },
};

export default function RoleDetailPage() {
  const router = useRouter();
  const { roleId } = useParams();
  const [permissions, setPermissions] =
    useState<Record<string, Record<string, boolean>>>(dummyPermissions);
  const [activeTab, setActiveTab] = useState("permissions");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => router.back()}>
          &larr; Back
        </Button>
        <h2 className="text-xl font-bold capitalize">
          {roleId?.toString().replaceAll("-", " ")}
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger
            value="permissions"
            onClick={() => setActiveTab("permissions")}
          >
            Assigned Permissions
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            onClick={() => setActiveTab("accounts")}
          >
            Connected Accounts
          </TabsTrigger>
        </TabsList>

        <div className="space-x-2">
          <Button variant="destructive">Delete Role</Button>
          <Button>Edit Role</Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsContent value="permissions">
          <PermissionMatrix value={permissions} onChange={setPermissions} />
        </TabsContent>
        <TabsContent value="accounts">
          <ConnectedAccounts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
