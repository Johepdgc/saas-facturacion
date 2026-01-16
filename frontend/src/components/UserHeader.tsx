"use client";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { apiService } from "@/lib/api";
import type { UserData } from "@/lib/api";

export default function UserHeader() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const data = (await apiService.syncUser(
          token ?? undefined
        )) as UserData;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) fetchUser();
  }, [user, getToken]);

  if (!userData) return null;

  return (
    <div className="flex items-center gap-2">
      <img
        src={userData?.imageUrl ?? "https://via.placeholder.com/40"}
        alt="User"
        className="w-8 h-8 rounded-full"
      />
      <div>
        <div className="font-bold">
          {userData?.firstName} {userData?.lastName}
        </div>
        <div className="text-xs text-gray-400">
          {userData?.companies?.[0]?.commercialName ?? "Sin comercio"}
        </div>
      </div>
    </div>
  );
}
