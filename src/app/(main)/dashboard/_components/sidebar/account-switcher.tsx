"use client";

import { useState } from "react";
import { BadgeCheck, Bell, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";
import { AdminProfileModal } from "@/components/modals/admin-profile-modal"; // ✅ Import modal

export function AccountSwitcher({
  users,
}: {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly role: string;
  }>;
}) {
  const [activeUser, setActiveUser] = useState(users[0]);
  const [profileOpen, setProfileOpen] = useState(false); // ✅ Modal state

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-9 rounded-lg">
            <AvatarImage src={activeUser.avatar || undefined} alt={activeUser.name} />
            <AvatarFallback className="rounded-lg">
              {getInitials(activeUser.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-56 space-y-1 rounded-lg" side="bottom" align="end" sideOffset={4}>
          {users.map((user) => (
            <DropdownMenuItem
              key={user.email}
              className={cn(
                "p-0",
                user.id === activeUser.id && "bg-accent/50 border-l-primary border-l-2"
              )}
              onClick={() => setActiveUser(user)}
            >
              <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
                <Avatar className="size-9 rounded-lg">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs capitalize">{user.role}</span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              <BadgeCheck className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ Attach Admin Profile Modal */}
      <AdminProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
