"use client";

import { Button } from "@/components/ui/button";
import {
  Loader2,
  LogOut,
  MessageSquare,
  Phone,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { accessToken, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.replace("/login");
    }
  }, [accessToken, loading]);

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
  const currentUser = {
    name: "Alex Johnson",
    avatar: "/avatars/01.png",
    status: "online",
  };

  const recentCalls = [
    { id: 1, name: "Team Meeting", type: "group", time: "2h ago" },
    { id: 2, name: "Sarah Miller", type: "private", time: "Yesterday" },
  ];

  const contacts = [
    {
      id: 1,
      name: "Sarah Miller",
      status: "online",
      avatar: "/avatars/02.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      status: "offline",
      avatar: "/avatars/03.png",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-center md:justify-start">
          <h1 className="text-xl font-bold hidden md:block text-indigo-600">
            VideoConnect
          </h1>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-center md:justify-start"
          >
            <Video className="h-5 w-5 mr-0 md:mr-3" />
            <span className="hidden md:inline">New Call</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-center md:justify-start"
          >
            <Users className="h-5 w-5 mr-0 md:mr-3" />
            <span className="hidden md:inline">Contacts</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-center md:justify-start"
          >
            <MessageSquare className="h-5 w-5 mr-0 md:mr-3" />
            <span className="hidden md:inline">Messages</span>
          </Button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Start Conversation</h3>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Phone className="h-5 w-5 mr-2" />
                  Private Call
                </Button>
                <Button className="w-full">
                  <Users className="h-5 w-5 mr-2" />
                  Group Call
                </Button>
              </div>
            </Card>

            {/* Recent Calls */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Calls</h3>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          call.type === "group"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {call.type === "group" ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          <Phone className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{call.name}</p>
                        <p className="text-sm text-gray-500">{call.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Online Contacts */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Online Contacts</h3>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p
                          className={`text-xs ${
                            contact.status === "online"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          {contact.status}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Call
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
