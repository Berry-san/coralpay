import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { LuCircleUserRound } from "react-icons/lu";
import { PiEqualizerBold, PiShieldCheckBold } from "react-icons/pi";

import { ChangePasswordForm } from "./ChangePasswordForm";
import { ProfileForm } from "./ProfileForm";
import { SessionManager } from "./SessionManager";

export function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "session"
  >("profile");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className=" p-0 w-full">
        <div className="flex h-[500px] ">
          {/* Sidebar */}
          <div className="w-1/3 bg-[#F6F3F8] p-5 space-y-4">
            <h2 className="text-lg font-semibold">Settings</h2>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex w-full text-left px-2 py-1 rounded-md ${
                  activeTab === "profile"
                    ? "bg-white font-semibold text-primary"
                    : "hover:bg-white/40"
                }`}
              >
                <LuCircleUserRound size={20} />
                <span className="ml-2"> Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex w-full text-left px-2 py-1 rounded-md ${
                  activeTab === "password"
                    ? "bg-white font-semibold text-primary"
                    : "hover:bg-white/40"
                }`}
              >
                <PiShieldCheckBold size={20} />
                <span className="ml-2"> Change Password</span>
              </button>
              <button
                onClick={() => setActiveTab("session")}
                className={`flex w-full text-left px-2 py-1 rounded-md ${
                  activeTab === "session"
                    ? "bg-white font-semibold text-primary"
                    : "hover:bg-white/40"
                }`}
              >
                <PiEqualizerBold size={20} />
                <span className="ml-2"> Session</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="w-2/3 p-6 overflow-y-auto">
            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "password" && <ChangePasswordForm />}
            {activeTab === "session" && <SessionManager />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
