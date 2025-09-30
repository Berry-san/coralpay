"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileForm() {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold mb-8">Settings</h2>

      <div className="flex items-center justify-between">
        <div className="bg-[#D5C6DC] h-20 w-20 rounded-full"></div>
        <Button className="bg-[#D5C6DC] text-primary font-semibold">
          Change Photo
        </Button>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">First Name</label>
            <Input defaultValue="Ada" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Last Name</label>
            <Input defaultValue="Dennis" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Role</label>
          <Input disabled value="Super Admin" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Phone Number</label>
          <Input defaultValue="08123456789" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Email Address</label>
          <Input defaultValue="ada.dennis@gmail.com" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button className="bg-[#D5C6DC] text-primary font-semibold">
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
