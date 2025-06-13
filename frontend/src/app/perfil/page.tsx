"use client";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { apiService } from "@/lib/api";
import Image from "next/image";

export default function PerfilPage() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        const currentUser = await apiService.getCurrentUser(token);
        setName(currentUser?.name || "");
        setImageUrl(currentUser?.imageUrl || "");
      } catch (err) {
        console.error("Error al cargar el perfil", err);
      }
    };

    if (user) {
      loadUser();
    }
  }, [user, getToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = await getToken();
      await apiService.updateCurrentUser({ name }, token);
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error al guardar perfil", err);
      alert("Error al actualizar el perfil");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-6 space-y-4"
      >
        <div className="flex items-center gap-4">
          <Image
            src={imageUrl || "https://via.placeholder.com/80"}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{user?.fullName}</p>
            <p className="text-sm text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
