import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface SidebarHeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarHeader = ({
  isOpen,
  toggleSidebar,
}: SidebarHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center">
      {/* Brand Title */}
      <div
        className={clsx(
          "text-xl font-bold text-indigo-600 transition-all duration-300",
          isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        )}
      >
        VideoConnect
      </div>

      {/* Toggle Button - Always visible */}
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleSidebar}
        className={clsx("ml-auto", "cursor-pointer")}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};
