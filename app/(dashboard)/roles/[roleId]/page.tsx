"use client";

import BackButton from "@/components/BackButton";
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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton />
        <h2 className="text-xl font-bold capitalize">
          {roleId?.toString().replaceAll("-", " ")}
        </h2>
      </div>
      <div className="space-x-2 flex items-end justify-end">
        <Button className="bg-[#D5C6DC] text-primary">Delete Role</Button>
        <Button>Edit Role</Button>
      </div>

      <div className="flex justify-between items-center w-full">
        <Tabs defaultValue="permissions" className="w-full">
          <TabsList>
            <TabsTrigger value="permissions">Assigned Permissions</TabsTrigger>
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          </TabsList>
          <TabsContent value="permissions">
            <PermissionMatrix value={permissions} onChange={setPermissions} />
          </TabsContent>
          <TabsContent value="accounts">
            <ConnectedAccounts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
