"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface AdminProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminProfileModal({ open, onOpenChange }: AdminProfileModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-center">
          <DialogTitle>Admin Profile</DialogTitle>
        </DialogHeader>

        <CardContent className="pt-2">
          <div className="flex flex-col items-center space-y-4 mb-6">
            <img
              src="/avatars/4153553.jpg"
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover shadow"
            />
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First Name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Last Name" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@email.com" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="username">Admin Username</Label>
              <Input id="username" placeholder="admin_user" />
            </div>

            <div className="sm:col-span-2 flex justify-end pt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
