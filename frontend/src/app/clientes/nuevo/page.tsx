"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiService } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faIdCard,
  faPhone,
  faCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function NuevoCliente() {
  const { getToken } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    nit: "",
    tipoPersona: "Natural",
    documento: "DUI",
    numeroDocumento: "",
    ciudad: "",
    sexo: "Masculino",
    celular: "",
    telefono: "",
    correo: "",
    ncr: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.nit.trim()) newErrors.nit = "El NIT es requerido";
    if (!form.numeroDocumento.trim())
      newErrors.numeroDocumento = "El número de documento es requerido";
    if (!form.correo.trim()) newErrors.correo = "El correo es requerido";
    if (!form.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!form.ciudad.trim()) newErrors.ciudad = "La ciudad es requerida";

    // Email validation
    if (form.correo && !/\S+@\S+\.\S+/.test(form.correo)) {
      newErrors.correo = "El correo no es válido";
    }

    // NIT validation (basic)
    if (form.nit && !/^\d{4}-\d{6}-\d{3}-\d$/.test(form.nit)) {
      newErrors.nit = "El formato del NIT debe ser: 0000-000000-000-0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const token = await getToken();
      await apiService.createClient(form, token);

      alert("Cliente creado exitosamente!");

      // Reset form
      setForm({
        nombre: "",
        nit: "",
        tipoPersona: "Natural",
        documento: "DUI",
        numeroDocumento: "",
        ciudad: "",
        sexo: "Masculino",
        celular: "",
        telefono: "",
        correo: "",
        ncr: "",
      });
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      alert("Error al crear el cliente. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar active="nuevo-cliente" />
      <main className="flex-1 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <input
              className="border rounded-full px-4 py-2 w-full"
              placeholder="Buscar..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-bold">Name</div>
              <div className="text-xs text-gray-400">Description</div>
            </div>
          </div>
        </div>

        {/* Title and Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <a href="/clientes" className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
          </a>
          <div>
            <h1 className="text-4xl font-bold">Crear Nuevo Cliente</h1>
            <p className="text-gray-600 mt-1">
              Complete la información del cliente
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                Información Personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nombre ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ingrese el nombre completo"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tipo de Persona *
                  </label>
                  <select
                    name="tipoPersona"
                    value={form.tipoPersona}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Natural">Persona Natural</option>
                    <option value="Jurídica">Persona Jurídica</option>
                  </select>
                </div>

                {form.tipoPersona === "Natural" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Sexo
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sexo"
                          value="Masculino"
                          checked={form.sexo === "Masculino"}
                          onChange={handleChange}
                          className="mr-2 text-blue-600"
                        />{" "}
                        Masculino
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sexo"
                          value="Femenino"
                          checked={form.sexo === "Femenino"}
                          onChange={handleChange}
                          className="mr-2 text-blue-600"
                        />
                        Femenino
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.ciudad ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ingrese la ciudad"
                  />
                  {errors.ciudad && (
                    <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Document Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faIdCard} className="text-green-600" />
                Información de Documentos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tipo de Documento *
                  </label>
                  <select
                    name="documento"
                    value={form.documento}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DUI">DUI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Carnet de Residente">
                      Carnet de Residente
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={form.numeroDocumento}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.numeroDocumento
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Ej: 12345678-9"
                  />
                  {errors.numeroDocumento && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.numeroDocumento}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    NIT *
                  </label>
                  <input
                    type="text"
                    name="nit"
                    value={form.nit}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nit ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0000-000000-000-0"
                  />
                  {errors.nit && (
                    <p className="text-red-500 text-sm mt-1">{errors.nit}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">NCR</label>
                  <input
                    type="text"
                    name="ncr"
                    value={form.ncr}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Número de Contribuyente"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-purple-600" />
                Información de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.correo ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.correo && (
                    <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.telefono ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+503 0000 0000"
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.telefono}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={form.celular}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+503 0000 0000"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheck} />
                    Guardar Cliente
                  </>
                )}
              </button>
              <a
                href="/clientes"
                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancelar
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
