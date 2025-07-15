"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner";

export default function AdminProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch("https://23838aa5981f.ngrok-free.app/api/admin/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(console.error);
  }, []);

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("access_token");

    const res = await fetch("https://23838aa5981f.ngrok-free.app/api/admin/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      toast.error("Update failed");
    } else {
      toast.success("Profile updated");
      setEditOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[70%_30%] items-start">
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
                {["first_name", "last_name", "email", "username", "phone", "address"].map((field) => (
                  <div key={field} className={field === "email" || field === "username" || field === "phone" || field === "address" ? "col-span-2" : ""}>
                    <Label>{field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</Label>
                    <Input disabled value={formData[field as keyof typeof formData] || ""} />
                  </div>
                ))}
              </div>
            </div>

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
                    {Object.keys(formData).map((key) => (
                      <div
                        key={key}
                        className={
                          key === "email" ||
                          key === "username" ||
                          key === "phone" ||
                          key === "address"
                            ? "space-y-1 col-span-2"
                            : "space-y-1"
                        }
                      >
                        <Label htmlFor={key}>{key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</Label>
                        <Input
                          id={key}
                          value={formData[key as keyof typeof formData]}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </form>
                  <DialogFooter>
                    <Button type="button" onClick={handleProfileUpdate}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
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
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
