"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  //   useSessionCheck();

  return (
    <div className="relative w-full flex flex-col overflow-hidden bg-[#FAFAFA] text-text-primary">
      <div className="flex w-full h-screen relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            // headerTitle="HalalNest Merchant"
            // sidebar={true}
          />
          <div className="flex-1 h-full px-4 py-4 mx-auto max-w-screen-2xl md:px-8 2xl:px-8">
            {children}
          </div>
          <Toaster position="bottom-right" />
        </main>
      </div>
    </div>
  );
};

export default Layout;
