import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <div className="">
      <div className="mx-auto max-w-screen-2xl pb-4">
        <h1 className="text-3xl font-bold">Hello, Sinzu Berry</h1>
        <div className="flex items-center justify-between mt-2">
          <p className="font-medium text-base">
            Welcome and Let’s do some work today!
          </p>
          <div className="md:flex items-center gap-2 hidden">
            <Search className="w-5 h-5" />
            <Bell className="w-5 h-5" />
          </div>
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              // setSidebarOpen(!sidebarOpen);
            }}
            className="z-40 block p-1.5 lg:hidden"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
