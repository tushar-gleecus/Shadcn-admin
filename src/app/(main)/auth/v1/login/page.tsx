import Link from "next/link";

import { Command } from "lucide-react";

import { LoginForm } from "../../_components/login-form";

export default function LoginV1() {
  return (
    <div className="flex h-dvh">
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="space-y-6">
  <img
    src="/Woman-Whisper.jpg"
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
      </div>

      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight text-xl">Login to continue</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Welcome back. Enter your email and password, let&apos;s hope you remember them.
            </div>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <p className="text-muted-foreground text-center text-s">
              Forgot your login details?{" "}
              <Link href="register" className="text-primary">
                Reset
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
