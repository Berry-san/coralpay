// "use client";

// import {
//   adminSidebarNavigation,
//   userSidebarNavigation,
// } from "@/constants/navigation";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { logoutUser } from "@/store/slice/userService/userService";
// import {
//   ChevronDown,
//   ChevronsLeft,
//   ChevronsRight,
//   SettingsIcon,
//   X,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { FiLogOut } from "react-icons/fi";
// import { SettingsModal } from "./SettingsModal";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
//   //   const { profilePicture, firstName, userRole } = useAppSelector(
//   //     (state) => state.userService.user
//   //   );
//   const user = useAppSelector((state) => state.userService.user);

//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const pathname = usePathname();
//   const trigger = useRef<HTMLButtonElement>(null);
//   const sidebar = useRef<HTMLElement>(null);

//   const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [open, setOpen] = useState(false);

//   // Detect mobile mode
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 1024);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Load saved sidebar state
//   useEffect(() => {
//     const saved = localStorage.getItem("sidebar-expanded");
//     if (saved && !isMobile) setSidebarExpanded(saved === "true");
//   }, [isMobile]);

//   // Save sidebar state
//   useEffect(() => {
//     if (!isMobile) {
//       localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
//     }
//   }, [sidebarExpanded, isMobile]);

//   // Close on outside click
//   useEffect(() => {
//     const clickHandler = (e: MouseEvent) => {
//       if (!sidebar.current || !trigger.current) return;
//       if (
//         !sidebarOpen ||
//         sidebar.current.contains(e.target as Node) ||
//         trigger.current.contains(e.target as Node)
//       )
//         return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener("click", clickHandler);
//     return () => document.removeEventListener("click", clickHandler);
//   }, [sidebarOpen]);

//   const toggleExpanded = () => {
//     if (!isMobile) setSidebarExpanded(!sidebarExpanded);
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     router.push("/login");
//   };

//   //   const navigationLinks =
//   //     userRole === "SUPER_ADMIN"
//   //       ? sidebarNavigation
//   //       : superAdminSidebarNavigation;

//   return (
//     <>
//       {/* Overlay */}
//       {sidebarOpen && isMobile && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         ref={sidebar}
//         className={`fixed top-0 left-0 z-40 h-screen bg-primary text-white transition-all duration-300 ease-in-out
//         ${
//           isMobile
//             ? sidebarOpen
//               ? "w-64"
//               : "w-0 -translate-x-full"
//             : sidebarExpanded
//             ? "w-72"
//             : "w-24"
//         }
//         lg:static lg:translate-x-0`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4">
//           <Link href="/overview" className="flex items-center gap-2 px-4">
//             <div className="border border-white h-10 w-10 rounded-full bg-black"></div>
//             {(sidebarExpanded || isMobile) && (
//               <p className="text-white text-lg font-semibold">Ada</p>
//             )}
//           </Link>

//           {!isMobile && (
//             <button
//               onClick={toggleExpanded}
//               className="absolute top-3 -right-4 z-50 bg-[#262626] border border-[#404040] rounded-full shadow-md p-1"
//             >
//               {sidebarExpanded ? (
//                 <ChevronsLeft className="w-6 h-6" />
//               ) : (
//                 <ChevronsRight className="w-6 h-6" />
//               )}
//             </button>
//           )}

//           {isMobile && (
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-1 hover:bg-gray-700 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           )}
//         </div>

//         <div className="flex flex-col h-full overflow-y-auto duration-300 ease-linear px-4">
//           <div className="flex-grow overflow-y-auto">
//             {/* Navigation */}
//             <nav className="py-4">
//               <ul className="space-y-1">
//                 {user?.email === "admin@coralpay.com"
//                   ? adminSidebarNavigation.map((link, index) => (
//                       <SidebarLinks
//                         // key={link.path}
//                         key={index}
//                         link={link}
//                         sidebarExpanded={sidebarExpanded || isMobile}
//                         onClick={() => isMobile && setSidebarOpen(false)}
//                       />
//                     ))
//                   : userSidebarNavigation.map((link, index) => (
//                       <SidebarLinks
//                         // key={link.path}
//                         key={index}
//                         link={link}
//                         sidebarExpanded={sidebarExpanded || isMobile}
//                         onClick={() => isMobile && setSidebarOpen(false)}
//                       />
//                     ))}
//               </ul>
//             </nav>
//           </div>

//           {/* Logout Button - Always at Bottom */}
//           {/* Bottom Section */}
//           <div className="px-4 space-y-4 text-lg mb-28">
//             <div
//               className="cursor-pointer flex space-x-2"
//               onClick={() => setOpen(true)}
//             >
//               <SettingsIcon className="size-7" />
//               {(sidebarExpanded || isMobile) && <span>Settings</span>}
//             </div>
//             <Link
//               href={"/login"}
//               onClick={handleLogout}
//               className="flex space-x-4 text-white cursor-pointer transition-colors"
//             >
//               <div className="rotate-180">
//                 <FiLogOut className="size-7" />
//               </div>
//               {(sidebarExpanded || isMobile) && <span>Logout</span>}
//             </Link>
//           </div>
//         </div>
//       </aside>
//       <SettingsModal open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// };

// interface SidebarLinksProps {
//   link: any;
//   sidebarExpanded: boolean;
//   onClick: () => void;
// }

// const SidebarLinks: React.FC<SidebarLinksProps> = ({
//   link,
//   sidebarExpanded,
//   onClick,
// }) => {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const hasChildren = !!link.children?.length;
//   const isActive = pathname.endsWith(link.path) || pathname === link.path;

//   const toggle = () => setIsOpen((prev) => !prev);

//   return (
//     <li>
//       <div
//         onClick={() => (hasChildren ? toggle() : onClick())}
//         className={`flex items-center justify-between cursor-pointer px-4 py-2 shrink-0 rounded-md transition-colors ${
//           isActive
//             ? "bg-white text-primary font-semibold"
//             : "hover:bg-white hover:text-primary text-white"
//         }`}
//       >
//         {hasChildren ? (
//           <div className="flex items-center gap-3">
//             <span className="text-lg">{link.icon}</span>
//             {sidebarExpanded && <span>{link.name}</span>}
//           </div>
//         ) : (
//           <Link
//             href={link.path}
//             className="flex items-center gap-3 w-full"
//             onClick={onClick}
//           >
//             <span className="text-lg">{link.icon}</span>
//             {sidebarExpanded && <span>{link.name}</span>}
//           </Link>
//         )}
//         {hasChildren && sidebarExpanded && (
//           <ChevronDown
//             className={`w-4 h-4 transition-transform ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         )}
//       </div>

//       {hasChildren && isOpen && (
//         <ul className="mt-1 space-y-1">
//           {link.children.map((sub: any) => {
//             const isSubActive =
//               pathname.endsWith(sub.path) || pathname === sub.path;
//             return (
//               <li key={sub.path}>
//                 <Link
//                   href={sub.path}
//                   onClick={onClick}
//                   className={`flex items-center gap-3 px-6 py-2 ml-4 text-sm rounded-md ${
//                     isSubActive
//                       ? "bg-white text-primary font-semibold"
//                       : "hover:bg-white hover:text-primary text-white"
//                   }`}
//                 >
//                   <span className="text-lg">{sub.icon}</span>
//                   <span>{sub.name}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </li>
//   );
// };

// export default Sidebar;

"use client";

import {
  adminSidebarNavigation,
  userSidebarNavigation,
} from "@/constants/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/slice/userService/userService";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  SettingsIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { SettingsModal } from "./SettingsModal";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type NavItem = {
  key?: string; // <- ensure your nav items have a stable unique key
  name: string;
  path?: string;
  icon?: React.ReactNode;
  children?: Array<NavItem>;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useAppSelector((state) => state.userService.user);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  // NEW: single source of truth for "which parent is open"
  const [openKey, setOpenKey] = useState<string | null>(null);

  // Detect mobile mode
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load saved sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-expanded");
    if (saved && !isMobile) setSidebarExpanded(saved === "true");
  }, [isMobile]);

  // Save sidebar state
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    }
  }, [sidebarExpanded, isMobile]);

  // Close on outside click
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(e.target as Node) ||
        trigger.current.contains(e.target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // NEW: when route changes, close the mobile drawer for better UX
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [pathname, isMobile, setSidebarOpen]);

  // NEW: toggleExpanded should also close any open children before minimizing
  const toggleExpanded = () => {
    if (isMobile) return;
    if (sidebarExpanded) {
      // currently expanded -> about to minimize: close any open group first
      setOpenKey(null);
      setSidebarExpanded(false);
    } else {
      setSidebarExpanded(true);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  const links: NavItem[] =
    user?.email === "admin@coralpay.com"
      ? adminSidebarNavigation
      : userSidebarNavigation;

  // Helper to ensure every item has a stable key
  const withKeys = (items: NavItem[], parentKey = ""): NavItem[] =>
    items.map((it, idx) => {
      const k = it.key ?? `${parentKey}${it.name || it.path || "item"}-${idx}`;
      return {
        ...it,
        key: k,
        children: it.children ? withKeys(it.children, `${k}-`) : undefined,
      };
    });

  const keyedLinks = withKeys(links);

  // NEW: parent click handler shared by all parent items
  const onParentClick = (item: NavItem) => {
    if (!item.key) return;
    // If minimized (on desktop), expand sidebar and open this parent
    if (!sidebarExpanded && !isMobile) {
      setSidebarExpanded(true);
      setOpenKey(item.key);
      return;
    }
    // If expanded, toggle this parent (and implicitly close others)
    setOpenKey((prev) => (prev === item.key ? null : item.key!));
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebar}
        className={`fixed top-0 left-0 z-40 h-screen bg-primary text-white transition-all duration-300 ease-in-out
        ${
          isMobile
            ? sidebarOpen
              ? "w-64"
              : "w-0 -translate-x-full"
            : sidebarExpanded
            ? "w-72"
            : "w-24"
        } 
        lg:static lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Link href="/overview" className="flex items-center gap-2 px-4">
            <div className="border border-white h-10 w-10 rounded-full bg-black"></div>
            {(sidebarExpanded || isMobile) && (
              <p className="text-white text-lg font-semibold">Ada</p>
            )}
          </Link>

          {!isMobile && (
            <button
              onClick={toggleExpanded}
              className="absolute top-3 -right-4 z-50 bg-[#262626] border border-[#404040] rounded-full shadow-md p-1"
            >
              {sidebarExpanded ? (
                <ChevronsLeft className="w-6 h-6" />
              ) : (
                <ChevronsRight className="w-6 h-6" />
              )}
            </button>
          )}

          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col h-full overflow-y-auto duration-300 ease-linear px-4">
          <div className="flex-grow overflow-y-auto">
            {/* Navigation */}
            <nav className="py-4">
              <ul className="space-y-1">
                {keyedLinks.map((link) => (
                  <SidebarLinks
                    key={link.key}
                    link={link}
                    sidebarExpanded={sidebarExpanded || isMobile}
                    isOpen={openKey === link.key}
                    onParentClick={() => onParentClick(link)}
                    onLeafClick={() => {
                      if (isMobile) setSidebarOpen(false);
                    }}
                  />
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="px-4 space-y-4 text-lg mb-28">
            <div
              className="cursor-pointer flex space-x-2"
              onClick={() => setOpen(true)}
            >
              <SettingsIcon className="size-7" />
              {(sidebarExpanded || isMobile) && <span>Settings</span>}
            </div>
            <Link
              href={"/login"}
              onClick={handleLogout}
              className="flex space-x-4 text-white cursor-pointer transition-colors"
            >
              <div className="rotate-180">
                <FiLogOut className="size-7" />
              </div>
              {(sidebarExpanded || isMobile) && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </aside>
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

interface SidebarLinksProps {
  link: NavItem;
  sidebarExpanded: boolean;
  isOpen: boolean;
  onParentClick: () => void;
  onLeafClick: () => void;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({
  link,
  sidebarExpanded,
  isOpen,
  onParentClick,
  onLeafClick,
}) => {
  const pathname = usePathname();
  const hasChildren = !!link.children?.length;
  const isActive =
    (!!link.path && (pathname.endsWith(link.path) || pathname === link.path)) ||
    false;

  return (
    <li>
      <div
        onClick={() => (hasChildren ? onParentClick() : undefined)}
        className={`flex items-center justify-between cursor-pointer px-4 py-2 shrink-0 rounded-md transition-colors ${
          isActive
            ? "bg-white text-primary font-semibold"
            : "hover:bg-white hover:text-primary text-white"
        }`}
      >
        {hasChildren ? (
          <div className="flex items-center gap-3">
            <span className="text-lg">{link.icon}</span>
            {sidebarExpanded && <span>{link.name}</span>}
          </div>
        ) : (
          <Link
            href={link.path || "#"}
            className="flex items-center gap-3 w-full"
            onClick={onLeafClick}
          >
            <span className="text-lg">{link.icon}</span>
            {sidebarExpanded && <span>{link.name}</span>}
          </Link>
        )}
        {hasChildren && sidebarExpanded && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {hasChildren && isOpen && sidebarExpanded && (
        <ul className="mt-1 space-y-1">
          {link.children!.map((sub) => {
            const isSubActive =
              (!!sub.path &&
                (pathname.endsWith(sub.path) || pathname === sub.path)) ||
              false;
            return (
              <li key={sub.key || sub.path || sub.name}>
                <Link
                  href={sub.path || "#"}
                  onClick={onLeafClick}
                  className={`flex items-center gap-3 px-6 py-2 ml-4 text-sm rounded-md ${
                    isSubActive
                      ? "bg-white text-primary font-semibold"
                      : "hover:bg-white hover:text-primary text-white"
                  }`}
                >
                  <span className="text-lg">{sub.icon}</span>
                  <span>{sub.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
