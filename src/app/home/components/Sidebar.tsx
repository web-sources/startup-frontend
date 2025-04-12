"use client";
import React from "react";

import { useState } from "react";
import { SidebarNav } from "./SidebarNav";
import { SidebarHeader } from "./SidebarHeader";
import clsx from "clsx";
import { CreateRoomModal } from "./CreateRoomModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

import { BASE_URL } from "@/utils/config";

import { useRoomStore } from "@/stores/userRoomStore";

const Sidebar = () => {
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isRoomModalOpen, setRoomModalOpen] = useState(false);

  interface CreateRoomData {
    name: string;
    description?: string;
    privacy: "public" | "private";
    room_type: "audio" | "video";
    interests: string[];
    participants?: string[] | undefined;
  }

  const handleCreateRoom = async (data: CreateRoomData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/startup/talkspace/rooms/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        const enrichedRoom = response.data;

        useRoomStore.getState().addRoom(enrichedRoom);

        toast.success("Room created successfully!");
        setRoomModalOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("Room creation failed. Please try again.");
      }
    }
  };

  return (
    <div
      className={clsx(
        "h-screen bg-white border-r transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <SidebarHeader isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <SidebarNav isOpen={isOpen} onCreateRoom={() => setRoomModalOpen(true)} />
      <CreateRoomModal
        isOpen={isRoomModalOpen}
        onClose={() => setRoomModalOpen(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default Sidebar;
