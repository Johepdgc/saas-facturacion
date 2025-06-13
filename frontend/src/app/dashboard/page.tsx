"use client";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { apiService } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import InvoicesTable from "@/components/InvoicesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBox } from "@fortawesome/free-solid-svg-icons";

interface Company {
  name: string;
  commercialName?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  companies?: Company[];
}

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getToken();
        // Sync user and get data
        const syncedUser = await apiService.syncUser(token);
        setUserData(syncedUser);

        // Load invoices
        const invoicesData = await apiService.getInvoices(token);
        setInvoices(invoicesData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, getToken]);

  const getTodayInvoices = () => {
    const today = new Date().toISOString().split("T")[0];
    return invoices.filter((invoice) =>
      invoice.transmissionDate?.startsWith(today)
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  const todayInvoices = getTodayInvoices();
  const company = userData?.companies?.[0];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="inicio" />
      <main className="flex-1 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <input
            className="border border-gray-300 rounded px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar..."
          />
          <div className="flex items-center gap-2">
            <Image
              src={
                userData?.imageUrl ??
                "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="User"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-bold">
                {userData?.firstName} {userData?.lastName}
              </div>
              <div className="text-xs text-gray-400">
                {company?.name ?? "Mi Empresa"}
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8">
          Bienvenido{" "}
          <span className="italic font-normal">
            {company?.commercialName ?? company?.name ?? "Mi Empresa"}
          </span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Facturas Hoy
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {todayInvoices.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ingresos Hoy
            </h3>
            <p className="text-3xl font-bold text-green-600">
              $
              {todayInvoices
                .reduce((sum, inv) => sum + Number(inv.total), 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Estado</h3>
            <p className="text-3xl font-bold text-gray-600">
              {todayInvoices.filter((inv) => inv.status === "PROCESADO").length}
              /{todayInvoices.length}
            </p>
          </div>
        </div>

        {/* Today's invoices */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Facturas de Hoy ({todayInvoices.length})
          </h2>
          {todayInvoices.length > 0 ? (
            <InvoicesTable data={todayInvoices} />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                No hay facturas emitidas hoy
              </h3>
            </div>
          )}
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-8 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6 text-xl font-bold">
              <FontAwesomeIcon icon={faUsers} className="text-2xl" /> Clientes
            </div>
            <div className="flex gap-4 w-full">
              <a
                href="/clientes/nuevo"
                className="flex-1 bg-gray-800 text-white rounded py-3 text-center hover:bg-black flex items-center justify-center gap-2 transition-colors"
              >
                Nuevo cliente
              </a>
              <a
                href="/clientes"
                className="flex-1 bg-gray-800 text-white rounded py-3 text-center hover:bg-black flex items-center justify-center gap-2 transition-colors"
              >
                Ver clientes
              </a>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-8 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6 text-xl font-bold">
              <FontAwesomeIcon icon={faBox} className="text-2xl" /> Inventario
            </div>
            <div className="flex gap-4 w-full">
              <a
                href="/inventario/nuevo"
                className="flex-1 bg-gray-800 text-white rounded py-3 text-center hover:bg-black flex items-center justify-center gap-2 transition-colors"
              >
                Agregar Item
              </a>
              <a
                href="/inventario"
                className="flex-1 bg-gray-800 text-white rounded py-3 text-center hover:bg-black flex items-center justify-center gap-2 transition-colors"
              >
                Ver Inventario
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
