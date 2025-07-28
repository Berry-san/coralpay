"use client";

import { InviteUserModal } from "@/components/InviteUserModal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { useState } from "react";
import { columns } from "./columns";
import { users } from "./data";

export default function UsersPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button
          onClick={() => setInviteModalOpen(true)}
          className="bg-purple-800 text-white hover:bg-purple-900"
        >
          Invite User
        </Button>
      </div>

      <DataTable columns={columns} data={users} />

      <InviteUserModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
}
