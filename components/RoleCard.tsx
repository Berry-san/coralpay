"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export function RoleCard({
  id,
  title,
  memberCount,
}: {
  id: string;
  title: string;
  memberCount: number;
}) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded-lg relative bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {memberCount} Member{memberCount !== 1 ? "s" : ""}
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={() => router.push(`/roles/${id}`)}
          >
            View permissions & accounts
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push(`/roles/${id}`)}>
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Delete Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
