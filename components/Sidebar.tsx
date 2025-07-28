"use client";

import { sidebarNavigation } from "@/constants/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slice/userService/userService";
import { ChevronDown, ChevronsLeft, ChevronsRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiSupport } from "react-icons/bi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  //   const { profilePicture, firstName, userRole } = useAppSelector(
  //     (state) => state.userService.user
  //   );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState(false);

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
  }, [sidebarOpen]);

  const toggleExpanded = () => {
    if (!isMobile) setSidebarExpanded(!sidebarExpanded);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenPopover(false);
    router.push("/login");
  };

  //   const navigationLinks =
  //     userRole === "SUPER_ADMIN"
  //       ? sidebarNavigation
  //       : superAdminSidebarNavigation;

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

        {/* Navigation */}
        <nav className="flex-1 py-4 px-4">
          <ul className="space-y-1">
            {sidebarNavigation.map((link) => (
              <SidebarLinks
                key={link.path}
                link={link}
                sidebarExpanded={sidebarExpanded || isMobile}
                onClick={() => isMobile && setSidebarOpen(false)}
              />
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="px-4 space-y-4 mb-6">
          <Link
            href="/support"
            className="flex items-center space-x-3 text-primary"
          >
            <BiSupport className="text-xl" />
            {sidebarExpanded && <span>Help & Support</span>}
          </Link>

          {/* <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger className="bg-secondary p-3 w-full rounded flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt="profile"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-primary w-8 h-8" />
                )}
                {sidebarExpanded && (
                  <span className="capitalize">{firstName?.toLowerCase()}</span>
                )}
              </div>
              {sidebarExpanded && <ChevronDown />}
            </PopoverTrigger>

            <PopoverContent className="bg-white w-60 border-none p-4 space-y-2 text-gray-700">
              <Link
                href="/settings/profile-information"
                onClick={() => setOpenPopover(false)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
              >
                <SettingsSVG className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded w-full"
              >
                <FiLogOut className="w-5 h-5 transform rotate-180" />
                <span>Logout</span>
              </button>
            </PopoverContent>
          </Popover> */}
        </div>
      </aside>
    </>
  );
};

interface SidebarLinksProps {
  link: any;
  sidebarExpanded: boolean;
  onClick: () => void;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({
  link,
  sidebarExpanded,
  onClick,
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!link.children?.length;
  const isActive = pathname.endsWith(link.path) || pathname === link.path;

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <li>
      <div
        onClick={() => (hasChildren ? toggle() : onClick())}
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
            href={link.path}
            className="flex items-center gap-3 w-full"
            onClick={onClick}
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

      {hasChildren && isOpen && (
        <ul className="mt-1 space-y-1">
          {link.children.map((sub: any) => {
            const isSubActive =
              pathname.endsWith(sub.path) || pathname === sub.path;
            return (
              <li key={sub.path}>
                <Link
                  href={sub.path}
                  onClick={onClick}
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
