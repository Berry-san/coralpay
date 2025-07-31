"use client";

import { PermissionMatrix } from "@/components/PermissionMatrix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { RoleSuccessDialog } from "@/components/roles/RoleSuccessDialog";

export default function CreateRolePage() {
  const [roleTitle, setRoleTitle] = useState("");
  const [permissions, setPermissions] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleCreate = () => {
    // Persist to DB (simulate)
    setShowSuccess(true);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => router.back()}>
          &larr; Back
        </Button>
        <h2 className="text-xl font-bold">Create a New Role</h2>
      </div>
      <Input
        placeholder="Enter Role title"
        value={roleTitle}
        onChange={(e) => setRoleTitle(e.target.value)}
      />
      <PermissionMatrix value={permissions} onChange={setPermissions} />
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleCreate}>Create Role</Button>
      </div>

      {/* <RoleSuccessDialog
        open={showSuccess}
        onClose={() => router.push("/roles")}
      /> */}
    </div>
  );
}
