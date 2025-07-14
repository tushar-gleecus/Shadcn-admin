"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z
  .object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function RegisterV1() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // TODO: Replace above with actual API call (e.g., resetPassword API)
  };

  return (
    <div className="flex h-dvh">
      {/* Form Section */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight text-3xl">Reset Password to continue</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Fill in your new password below. We promise not to quiz you about your first pet&apos;s name (this time).
            </div>
          </div>

          {/* Merged RegisterForm */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Reset
              </Button>
            </form>
          </Form>

          <p className="text-muted-foreground text-center text-s">
            Already have an account?{" "}
            <Link href="login" className="text-primary hover:underline cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <img
              src="/reset.jpg"
              alt="Welcome Illustration"
              className="mx-auto w-32 h-32 object-contain rounded-full border-4 border-white shadow-md"
            />
            <div className="space-y-2 flex flex-col items-center justify-center">
              <h1 className="text-primary-foreground text-5xl font-light text-center">DevHub Admin</h1>
              <p className="text-primary-foreground/80 text-xl text-center">
                Build for developers, by developers....
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
