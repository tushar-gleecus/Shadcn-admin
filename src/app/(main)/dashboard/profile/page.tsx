"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminProfilePage() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[70%_30%] items-start">
        {/* Admin Info Card */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Admin Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src="/woman-whisper.jpg"
                  alt="Admin Avatar"
                  width={80}
                  height={80}
                  className="rounded-full border object-cover"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div>
                  <Label>First Name</Label>
                  <Input disabled value="Tushar" />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input disabled value="Canchi" />
                </div>
                <div className="col-span-2">
                  <Label>Email</Label>
                  <Input disabled value="tushar.canchi@gleecus.com" />
                </div>
                <div className="col-span-2">
                  <Label>Username</Label>
                  <Input disabled value="admin_user" />
                </div>
                <div className="col-span-2">
                  <Label>Phone</Label>
                  <Input disabled value="+91 9999999999" />
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Input disabled value="Hyderabad, India" />
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-end gap-4 pt-2">
              <Button size="sm">Change Photo</Button>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">Edit Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Admin Details</DialogTitle>
                    <DialogDescription>Update your profile info below.</DialogDescription>
                  </DialogHeader>
                  <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Tushar" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Canchi" />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="tushar.canchi@gleecus.com" />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="admin_user" />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+91 9999999999" />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="Hyderabad, India" />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Reset Password Card */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-full">
            <form className="flex flex-col justify-between h-full space-y-4">
              <div className="space-y-1">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm password" />
              </div>
              <Button type="submit" className="w-full mt-4">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
