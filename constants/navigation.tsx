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

export const adminSidebarNavigation = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <LuLayoutDashboard className="size-6" />,
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
        path: "/merchants",
      },
    ],
    icon: <PiBriefcaseBold className="size-6" />,
  },
  {
    name: "Admin Setup",
    icon: <PiUserListBold className="size-6" />,
    children: [
      {
        name: "Users",
        path: "/users",
      },
      {
        name: "Roles",
        path: "/roles",
      },
    ],
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: <PiReceiptBold className="size-6" />,
  },
  {
    name: "Services",
    icon: <PiTreeStructureBold className="size-6" />,
    children: [
      {
        name: "List of Services",
        path: "/services",
      },
      {
        name: "Pending Approvals",
        path: "/pending-approvals",
      },
    ],
  },

  {
    name: "Reports",
    path: "/reports",
    icon: <PiChartPieSliceBold className="size-6" />,
  },
  {
    name: "Short Code",
    icon: <PiBinaryBold className="size-6" />,
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
    icon: <PiEqualizerBold className="size-6" />,
  },
];

export const userSidebarNavigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard className="size-6" />,
  },
  {
    name: "Users Management",
    icon: <PiUserListBold className="size-6" />,
    children: [
      {
        name: "Users",
        path: "/users",
      },
      {
        name: "Roles",
        path: "/roles",
      },
    ],
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: <PiReceiptBold className="size-6" />,
  },
  {
    name: "Services",
    icon: <PiTreeStructureBold className="size-6" />,
    children: [
      {
        name: "All Services",
        path: "/services",
      },
      {
        name: "Build Service",
        path: "/services/build-service",
      },
    ],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <PiChartPieSliceBold className="size-6" />,
  },
  {
    name: "Short Code Requests",
    path: "/apply-code",
    icon: <PiBinaryBold className="size-6" />,
  },
];
