"use client";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useRoomStore } from "@/stores/userRoomStore";
import { BookOpen, Mic, Video, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const interestOptions = [
  {
    id: "dbac4910-103d-421d-a51d-3a1dbd2720f0",
    name: "Book",
  },
  {
    id: "6ee6d0d8-69eb-4655-a40a-3c467c63279f",
    name: "Eating",
  },
];

export default function Home() {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  const rooms = useRoomStore((state) => state.rooms);

  console.log(rooms);

  useEffect(() => {
    if (!loading && !accessToken) {
      router.replace("/login");
    }
  }, [accessToken, loading, router]);

  if (loading || !accessToken) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  const bgGradients = [
    "bg-gradient-to-r from-pink-200 via-white to-white",
    "bg-gradient-to-r from-green-200 via-white to-white",
    "bg-gradient-to-r from-yellow-200 via-white to-white",
    "bg-gradient-to-r from-blue-200 via-white to-white",
    "bg-gradient-to-r from-purple-200 via-white to-white",
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3 overflow-y-auto">
            {rooms.map((room, index) => (
              <Card
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Top section with background highlight */}
                <div
                  className={`p-2 ${bgGradients[index % bgGradients.length]}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Side: Room Name + Interests */}
                    <div className="flex flex-col flex-1">
                      <h2 className="text-xl font-bold text-gray-800 truncate">
                        {room.name}
                      </h2>

                      {/* Interests */}
                      <div className="mt-1 flex flex-wrap gap-2">
                        {room.interests.map((id) => {
                          const interest = interestOptions.find(
                            (opt) => opt.id === id
                          );
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"
                            >
                              <BookOpen className="w-3 h-3" />
                              {interest?.name || "Unknown"}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Room Info */}
                <CardContent className="space-y-3">
                  {/* Room Type */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {room.room_type === "audio" ? (
                      <Mic className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Video className="w-4 h-4 text-pink-500" />
                    )}
                    {room.room_type.charAt(0).toUpperCase() +
                      room.room_type.slice(1)}
                  </div>

                  {/* Privacy */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-yellow-500" />
                    {room.privacy.charAt(0).toUpperCase() +
                      room.privacy.slice(1)}
                  </div>

                  {/* Participants */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    {(room.participants ?? []).length > 0 ? (
                      <div className="flex -space-x-2 overflow-hidden">
                        {(room.participants ?? [])
                          .slice(0, 3)
                          .map((p: any, index: number) => (
                            <Avatar
                              key={index}
                              className="h-7 w-7 border-2 border-white hover:z-10 transition-transform hover:scale-105"
                            >
                              <AvatarFallback className="text-xs bg-gray-200 text-gray-700">
                                {p.name?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        {(room.participants ?? []).length > 3 && (
                          <div className="text-xs text-gray-500 ml-2">
                            +{(room.participants ?? []).length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">No participants</span>
                    )}
                  </div>
                </CardContent>

                {/* Action button at the bottom */}
                <div className="px-5 pb-5">
                  <Button
                    className="w-full mt-3 hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                    variant="outline"
                  >
                    {"Join Now"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
