import { LuLayoutDashboard } from "react-icons/lu";
import {
  PiBinaryBold,
  PiBriefcaseBold,
  PiChartPieSliceBold,
  PiEqualizerBold,
  PiReceiptBold,
  PiTreeStructureBold,
  PiUserListBold,
} from "react-icons/pi";

export const sidebarNavigation = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <LuLayoutDashboard className="size-7" />,
  },
  {
    name: "Merchant Onboarding",
    children: [
      {
        name: "Contact Person",
        path: "merchants/contacts",
      },
      {
        name: "Merchants",
        path: "merchants",
      },
    ],
    icon: <PiBriefcaseBold className="size-7" />,
  },
  {
    name: "Admin Setup",
    icon: <PiUserListBold className="size-7" />,
    children: [
      {
        name: "Users",
        path: "admin/users",
      },
      {
        name: "Roles",
        path: "admin/roles",
      },
    ],
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: <PiReceiptBold className="size-7" />,
  },
  {
    name: "Services",
    path: "/services",
    icon: <PiTreeStructureBold className="size-7" />,
  },

  {
    name: "Reports",
    path: "/reports",
    icon: <PiChartPieSliceBold className="size-7" />,
  },
  {
    name: "Short Code",
    icon: <PiBinaryBold className="size-7" />,
    children: [
      {
        name: "Configured Short Codes",
        path: "/configure-code",
      },
      {
        name: "Short Code Requests",
        path: "/code-requests",
      },
    ],
  },
  {
    name: "Audit Log",
    path: "/audit-log",
    icon: <PiEqualizerBold className="size-7" />,
  },
];
