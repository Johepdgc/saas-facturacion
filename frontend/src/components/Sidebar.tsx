"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileInvoice,
  faUsers,
  faBox,
  faPlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ active }: Readonly<{ active: string }>) {
  return (
    <aside className="w-72 bg-gray-100 min-h-screen flex flex-col justify-between border-r border-gray-200 shadow-sm">
      <div className="px-8 py-8">
        {/* Logo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            Facturación
            <br />
            <span className="text-blue-600">Electrónica</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
              active === "inicio"
                ? "bg-blue-600 text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-white hover:shadow-sm"
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="text-lg w-5" />
            <span>Inicio</span>
          </Link>

          <Link
            href="/facturas"
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
              active === "facturas"
                ? "bg-blue-600 text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-white hover:shadow-sm"
            }`}
          >
            <FontAwesomeIcon icon={faFileInvoice} className="text-lg w-5" />
            <span>Facturas</span>
          </Link>

          <div className="mb-2">
            <div className="flex items-center gap-3 py-3 px-4 text-gray-700 font-medium">
              <FontAwesomeIcon icon={faUsers} className="text-lg w-5" />
              <span>Clientes</span>
            </div>
            <div className="ml-8 flex flex-col gap-1">
              <Link
                href="/clientes/nuevo"
                className={`flex items-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                  active === "nuevo-cliente"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm w-4" />
                <span className="text-sm">Nuevo Cliente</span>
              </Link>
              <Link
                href="/clientes"
                className={`flex items-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                  active === "clientes"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <FontAwesomeIcon icon={faList} className="text-sm w-4" />
                <span className="text-sm">Clientes Registrados</span>
              </Link>
            </div>
          </div>

          <Link
            href="/inventario"
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
              active === "inventario"
                ? "bg-blue-600 text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-white hover:shadow-sm"
            }`}
          >
            <FontAwesomeIcon icon={faBox} className="text-lg w-5" />
            <span>Inventario</span>
          </Link>
        </nav>
      </div>

      {/* User actions */}
      <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <Link
            href="/perfil"
            className="text-sm text-blue-600 hover:underline"
          >
            Mi perfil
          </Link>
          <UserButton />
        </div>
      </div>
    </aside>
  );
}
