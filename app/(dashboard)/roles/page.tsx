"use client";

import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const roles = [
  { id: "super", name: "Super Admin", members: 1 },
  { id: "admin4", name: "Admin 4", members: 8 },
  { id: "admin3", name: "Admin 3", members: 4 },
  { id: "support", name: "Customer Support Agent", members: 13 },
  { id: "admin2", name: "Admin 2", members: 2 },
  { id: "admin1", name: "Admin 1", members: 2 },
];

export default function RolesPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Roles</h2>
          <p className="text-sm text-muted-foreground">
            View and manage all custom roles. Each role defines access levels
            and permissions across the admin portal.
          </p>
        </div>
        <Button onClick={() => router.push("/roles/new")}>Create Role</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            id={role.id}
            title={role.name}
            memberCount={role.members}
          />
        ))}
      </div>
    </div>
  );
}
