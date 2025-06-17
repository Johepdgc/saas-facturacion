"use client";
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp
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
        signInUrl="/sign-in"
        afterSignUpUrl="/onboarding/step1"
      />
    </AuthLayout>
  );
}
