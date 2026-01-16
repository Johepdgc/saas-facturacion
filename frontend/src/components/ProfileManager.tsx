"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { apiService } from "@/lib/api";

export default function ProfileManager() {
  const { user } = useUser();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [company, setCompany] = useState({
    name: "",
    nit: "",
    address: "",
    phone: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: user.phoneNumbers[0]?.phoneNumber || "",
      });
    }
  }, [user]);

  const handleImageUpload = async (file: File) => {
    if (!user) return;

    try {
      await user.setProfileImage({ file });
      await user.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await apiService.updateProfile(profile);
      await apiService.updateCompany(company);

      if (imageFile) {
        await handleImageUpload(imageFile);
      }

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Información Personal</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Foto de Perfil
            </label>
            <div className="flex items-center gap-4">
              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellido</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Información de la Empresa
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={company.name}
                onChange={(e) =>
                  setCompany({ ...company, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NIT</label>
              <input
                type="text"
                value={company.nit}
                onChange={(e) =>
                  setCompany({ ...company, nit: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="0000-000000-000-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Dirección
              </label>
              <textarea
                value={company.address}
                onChange={(e) =>
                  setCompany({ ...company, address: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Teléfono de la Empresa
              </label>
              <input
                type="tel"
                value={company.phone}
                onChange={(e) =>
                  setCompany({ ...company, phone: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email de la Empresa
              </label>
              <input
                type="email"
                value={company.email}
                onChange={(e) =>
                  setCompany({ ...company, email: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSaveProfile}
          disabled={isLoading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
}
