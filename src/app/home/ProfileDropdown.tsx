"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import ChangepasswordModel from "./ChangepasswordModel";
import UpdateprofileModel from "./UpdateprofileModel";

export default function ProfileDropdown() {
  const { logout } = useAuth();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const handleOpenPasswordChange = (open: boolean) => {
    setPasswordModalOpen(open);
    if (open) setDropdownOpen(false); // close dropdown when opening modal
  };

  const handleOpenProfileChange = (open: boolean) => {
    setProfileModalOpen(open);
    if (open) setDropdownOpen(false); // close dropdown when opening modal
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-3">
          <DropdownMenuItem
            onSelect={() => {
              setProfileModalOpen(true);
              setDropdownOpen(false);
            }}
          >
            Update Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setPasswordModalOpen(true);
              setDropdownOpen(false);
            }}
          >
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangepasswordModel
        open={isPasswordModalOpen}
        onOpenChange={handleOpenPasswordChange}
      />

      <UpdateprofileModel
        open={isProfileModalOpen}
        onOpenChange={handleOpenProfileChange}
      />
    </>
  );
}
