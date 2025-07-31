"use client";

import { Button } from "@/components/ui/button";

export function SessionManager() {
  const sessions = [
    { ip: "103.89.110.172", date: "26th July, 2025", active: true },
    { ip: "103.89.110.172", date: "26th July, 2025", active: false },
  ];

  return (
    <div className="space-y-4">
      {sessions.map((s, i) => (
        <div key={i} className="border rounded-md p-4 space-y-1">
          <p className="text-sm font-semibold">Windows {s.ip}</p>
          {s.active ? (
            <p className="text-xs text-green-600 font-medium">Active Now</p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Last accessed: {s.date}
          </p>
          <Button variant="destructive" size="sm" className="mt-2">
            Revoke Access
          </Button>
        </div>
      ))}
    </div>
  );
}
