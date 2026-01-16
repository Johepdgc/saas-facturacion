"use client";
import Sidebar from "@/components/Sidebar";
import UserHeader from "@/components/UserHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InvoicesTable from "@/components/InvoicesTable";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { apiService } from "@/lib/api";

export default function Facturas() {
  const { getToken } = useAuth();
  const [facturas, setFacturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const token = await getToken();
        const data = await apiService.getInvoices(token);
        setFacturas(data);
      } catch (err) {
        console.error("Error al obtener facturas:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFacturas();
  }, [getToken]);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar active="facturas" />
      <main className="flex-1 p-12 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <input
            className="border border-gray-300 rounded px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar facturas..."
          />
          <UserHeader />
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Facturas Emitidas</h1>
          <a
            href="/facturas/nueva"
            className="bg-black text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} /> Crear Factura
          </a>
        </div>

        {/* Table container that respects viewport */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <InvoicesTable data={facturas} />
        </div>
      </main>
    </div>
  );
}
