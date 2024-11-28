"use client";

import { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  const toggleAuthType = () => {
    setAuthType(authType === "signin" ? "signup" : "signin");
  };

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <AuthForm type={authType} onSuccess={handleSuccess} />
        <p className="text-center text-sm">
          {authType === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={toggleAuthType}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleAuthType}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}