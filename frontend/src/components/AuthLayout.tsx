"use client";
import { ReactNode } from "react";

export default function AuthLayout({
  title,
  children,
}: Readonly<{
  title?: string;
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DBDBDB]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10">
        {title && (
          <h1 className="text-3xl font-bold text-center mb-6 text-[#1C3C64]">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
}
