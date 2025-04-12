import { Video, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";

interface SidebarNavProps {
  isOpen: boolean;
  onCreateRoom: () => void;
}

const currentUser = {
  name: "Alex Johnson",
  avatar: "/avatars/01.png",
  status: "online",
};

export const SidebarNav = ({ isOpen, onCreateRoom }: SidebarNavProps)  => {
  return (
    <div
      className={clsx(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Nav Items */}
      <nav className="flex-1 p-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start cursor-pointer" onClick={onCreateRoom}>
          <Video className="h-5 w-5 mr-3" />
          {isOpen && <span>Create Room</span>}
        </Button>
        <Button variant="ghost" className="w-full justify-start cursor-pointer">
          <Users className="h-5 w-5 mr-3" />
          {isOpen && <span>Contacts</span>}
        </Button>
        <Button variant="ghost" className="w-full justify-start cursor-pointer">
          <MessageSquare className="h-5 w-5 mr-3" />
          {isOpen && <span>Messages</span>}
        </Button>
      </nav>

      {/* Avatar Section */}
      <div
        className={clsx(
          "p-4 border-t border-gray-200 transition-all duration-300",
          isOpen ? "justify-start" : "justify-center"
        )}
      >
        <div
          className={clsx(
            "flex items-center space-x-2",
            !isOpen && "justify-center"
          )}
        >
          <Avatar>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
