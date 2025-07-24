"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Admin } from "@/types/admin";

type AdminWithoutId = Omit<Admin, "id">;

const nameRegex = /^[A-Za-z\s-]+$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

export default function AdminForm({
  onAddAdmin,
}: {
  onAddAdmin: (admin: AdminWithoutId) => void;
}) {
  const [form, setForm] = useState<AdminWithoutId>({
    first_name: "",
    last_name: "",
    email: "",
    role: "Admin",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState<{ [k in keyof AdminWithoutId]?: boolean }>({});
  const [errors, setErrors] = useState<Partial<Record<keyof AdminWithoutId, string>>>({});

  const validate = (values: AdminWithoutId) => {
    const errs: Partial<Record<keyof AdminWithoutId, string>> = {};

    // First Name validation
    if (!values.first_name.trim()) {
      errs.first_name = "First name is required.";
    } else if (!nameRegex.test(values.first_name.trim())) {
      errs.first_name = "First name should only contain letters, spaces, or hyphens.";
    }

    // Last Name validation
    if (!values.last_name.trim()) {
      errs.last_name = "Last name is required.";
    } else if (!nameRegex.test(values.last_name.trim())) {
      errs.last_name = "Last name should only contain letters, spaces, or hyphens.";
    }

    // Email validation
    if (!values.email.trim()) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(values.email.trim())) {
      errs.email = "Enter a valid email address.";
    }

    // Role validation
    if (!values.role.trim()) {
      errs.role = "Role is required.";
    }

    return errs;
  };

  const handleChange = (field: keyof AdminWithoutId, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(updated));
  };

  const handleBlur = (field: keyof AdminWithoutId) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      first_name: true,
      last_name: true,
      email: true,
      role: true,
    });
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setSuccess("");
    setTimeout(() => {
      onAddAdmin(form);
      setForm({ first_name: "", last_name: "", email: "", role: "Admin" });
      setTouched({});
      setLoading(false);
      setSuccess("A welcome email has been sent and the admin user was added.");
      setTimeout(() => setSuccess(""), 4000);
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label>
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            className={`border border-zinc-400 focus:border-zinc-600 ${
              touched.first_name && errors.first_name ? "border-red-500" : ""
            }`}
            placeholder="e.g., John"
            value={form.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
            onBlur={() => handleBlur("first_name")}
            disabled={loading}
          />
          {touched.first_name && errors.first_name && (
            <p className="text-xs text-red-600">{errors.first_name}</p>
          )}
        </div>
        {/* Last Name */}
        <div className="space-y-2">
          <Label>
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            className={`border border-zinc-400 focus:border-zinc-600 ${
              touched.last_name && errors.last_name ? "border-red-500" : ""
            }`}
            placeholder="e.g., Doe"
            value={form.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
            onBlur={() => handleBlur("last_name")}
            disabled={loading}
          />
          {touched.last_name && errors.last_name && (
            <p className="text-xs text-red-600">{errors.last_name}</p>
          )}
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Label>
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            className={`border border-zinc-400 focus:border-zinc-600 ${
              touched.email && errors.email ? "border-red-500" : ""
            }`}
            placeholder="e.g., john@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            This email would be used by the user for logging in.
          </p>
          {touched.email && errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </div>
        {/* Role */}
        <div className="col-span-full space-y-2">
          <Label>
            Role <span className="text-red-500">*</span>
          </Label>
          <Select
            value={form.role}
            onValueChange={(value) => handleChange("role", value as AdminWithoutId["role"])}
            disabled={loading}
          >
            <SelectTrigger
  className={`border border-zinc-400 focus:border-zinc-600 max-w-xs ${
    touched.role && errors.role ? "border-red-500" : ""
  }`}
>
  <SelectValue />
</SelectTrigger>

            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            The selected role will determine the user's permissions.
          </p>
          {touched.role && errors.role && (
            <p className="text-xs text-red-600">{errors.role}</p>
          )}
        </div>
        {/* Submit */}
        <div className="col-span-full">
          <Button
            disabled={
              loading ||
              Object.keys(validate(form)).length > 0
            }
            className="flex items-center"
            type="submit"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {loading ? "Submitting..." : "Save"}
          </Button>
          {success && (
            <p className="text-green-600 text-sm mt-2">{success}</p>
          )}
        </div>
      </div>
    </form>
  );
}
