"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileForm() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <Input defaultValue="Ada" />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <Input defaultValue="Dennis" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <Input disabled defaultValue="Super Admin" />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <Input defaultValue="08123456789" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email Address</label>
        <Input defaultValue="ada.dennis@gmail.com" />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </form>
  );
}
