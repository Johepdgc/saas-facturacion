"use client";
import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#1C3C64",
            colorText: "#1C3C64",
            colorTextSecondary: "#8395A4",
            colorAlphaShade: "#DBDBDB",
          },
          elements: {
            card: "shadow-none border-none p-0",
            formButtonPrimary: "bg-[#1C3C64] text-white hover:bg-[#122742]",
          },
        }}
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
      />
    </AuthLayout>
  );
}
