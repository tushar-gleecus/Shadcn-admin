"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Main login schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  remember: z.boolean().optional(),
});

// Reset password schema
const ResetSchema = z.object({
  email: z.string().email({ message: "Please enter a registered email address." }),
});

export default function LoginV1() {
  const [showResetForm, setShowResetForm] = useState(false);
  const [showResetSent, setShowResetSent] = useState(false);

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const resetForm = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (data: z.infer<typeof LoginSchema>) => {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // TODO: Integrate login API here
  };

  const onResetSubmit = async (data: z.infer<typeof ResetSchema>) => {
    // TODO: Integrate password reset email API here
    console.log("Reset request for:", data.email);
    setShowResetForm(false);
    setShowResetSent(true);
  };

  return (
    <div className="flex h-dvh">
      {/* Left Side */}
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <img
              src="/login_2.png"
              alt="Welcome Illustration"
              className="mx-auto w-32 h-32 object-contain rounded-full border-4 border-white shadow-md"
            />
            <div className="space-y-2">
              <h1 className="text-primary-foreground text-5xl font-light">DevHub Admin</h1>
              <p className="text-primary-foreground/80 text-xl">Build for developers, by developers...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight text-3xl">Login to continue</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Welcome back. Enter your email and password, let&apos;s hope you remember them.
            </div>
          </div>

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormControl>
                      <Checkbox
                        id="login-remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="size-4"
                      />
                    </FormControl>
                    <FormLabel htmlFor="login-remember" className="text-muted-foreground ml-1 text-sm font-medium">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>

          <p className="text-muted-foreground text-center text-s">
            Forgot your login details?{" "}
            <button
              type="button"
              className="text-primary hover:opacity-90 cursor-pointer"
              onClick={() => setShowResetForm(true)}
            >
              Reset
            </button>
          </p>
        </div>
      </div>

      {/* Reset Form Modal */}
      <Dialog open={showResetForm} onOpenChange={setShowResetForm}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="flex flex-col items-center">
              <DialogTitle>Reset Your Password</DialogTitle>
            </div>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-4">
            Please enter your registered email address. We’ll send you a reset link over email.
          </p>
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
              <FormField
                control={resetForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-2">
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Modal */}
      <Dialog open={showResetSent} onOpenChange={setShowResetSent}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <MailCheck className="text-primary h-10 w-10" />
              <DialogTitle>Password Reset Link Sent</DialogTitle>
            </div>
          </DialogHeader>
          <div className="text-muted-foreground text-sm leading-relaxed">
            We have sent a reset link to your registered email address.
            <br />
            Please check your inbox and follow the link to reset your password.
          </div>
          <DialogFooter className="pt-4 justify-center">
            <Button onClick={() => setShowResetSent(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
