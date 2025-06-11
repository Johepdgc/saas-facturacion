"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faUsers,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

type Client = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  celular?: string;
  nit: string;
  documento: string;
  numeroDocumento: string;
  tipoPersona: string;
  sexo?: string;
  ciudad: string;
  ncr?: string;
  fechaRegistro: string;
};

const initialClients: Client[] = [
  {
    id: 1,
    nombre: "Johep Daniel Gradis Cortes",
    correo: "johepdg07@icloud.com",
    telefono: "+503 6103 1008",
    celular: "+503 7890 1234",
    nit: "1217-120703-105-9",
    documento: "DUI",
    numeroDocumento: "06540720-9",
    tipoPersona: "Natural",
    sexo: "Masculino",
    ciudad: "San Salvador",
    ncr: "123456",
    fechaRegistro: "2025-01-01",
  },
  {
    id: 2,
    nombre: "María Elena Rodríguez",
    correo: "maria.rodriguez@email.com",
    telefono: "+503 2234 5678",
    celular: "+503 7123 4567",
    nit: "0614-120485-102-8",
    documento: "DUI",
    numeroDocumento: "03456789-1",
    tipoPersona: "Natural",
    sexo: "Femenino",
    ciudad: "Santa Ana",
    ncr: "654321",
    fechaRegistro: "2025-01-02",
  },
  {
    id: 3,
    nombre: "Empresa Tecnológica S.A. de C.V.",
    correo: "info@empresa.com",
    telefono: "+503 2500 1000",
    nit: "0614-250184-001-3",
    documento: "NIT",
    numeroDocumento: "0614-250184-001-3",
    tipoPersona: "Jurídica",
    ciudad: "San Salvador",
    ncr: "987654",
    fechaRegistro: "2025-01-03",
  },
];

export default function ClientesRegistrados() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter clients based on search term
  const filteredClients = clients.filter(
    (client) =>
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.nit.includes(searchTerm) ||
      client.telefono.includes(searchTerm)
  );

  // Handle delete client
  const handleDeleteClient = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  // View client details
  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setShowDetails(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar active="clientes" />
      <main className="flex-1 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <input
              type="text"
              className="border rounded-full px-4 py-2 pl-10 w-full"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-bold">Name</div>
              <div className="text-xs text-gray-400">Description</div>
            </div>
          </div>
        </div>

        {/* Title and Stats */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Clientes Registrados</h1>
            <p className="text-gray-600">
              Total:{" "}
              {filteredClients.length} cliente
              {filteredClients.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href="/clientes/nuevo"
            className="bg-black text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faPlus} /> Nuevo Cliente
          </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-blue-600 text-2xl"
              />
              <h3 className="text-lg font-semibold">Total Clientes</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {clients.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-green-600 text-2xl"
              />
              <h3 className="text-lg font-semibold">Personas Naturales</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {clients.filter((c) => c.tipoPersona === "Natural").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-purple-600 text-2xl"
              />
              <h3 className="text-lg font-semibold">Personas Jurídicas</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {clients.filter((c) => c.tipoPersona === "Jurídica").length}
            </p>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Documento</th>
                  <th className="px-4 py-3">NIT</th>
                  <th className="px-4 py-3">Fecha Registro</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{client.nombre}</div>
                        <div className="text-xs text-gray-500">
                          {client.ciudad}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          client.tipoPersona === "Natural"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {client.tipoPersona}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-gray-400"
                          />
                          {client.correo}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="text-gray-400"
                          />
                          {client.telefono}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{client.documento}</div>
                        <div className="text-xs text-gray-500">
                          {client.numeroDocumento}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono">{client.nit}</td>
                    <td className="px-4 py-3">{client.fechaRegistro}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(client)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Ver detalles"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Editar"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-gray-300 text-4xl mb-4"
              />
              <p className="text-gray-500">No se encontraron clientes</p>
            </div>
          )}
        </div>

        {/* Client Details Modal */}
        {showDetails && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Detalles del Cliente</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Información Personal
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">
                        Nombre Completo
                      </label>
                      <p className="font-medium">{selectedClient.nombre}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Tipo de Persona
                      </label>
                      <p className="font-medium">{selectedClient.tipoPersona}</p>
                    </div>
                    {selectedClient.sexo && (
                      <div>
                        <label className="text-sm text-gray-500">Sexo</label>
                        <p className="font-medium">{selectedClient.sexo}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm text-gray-500">Ciudad</label>
                      <p className="font-medium">{selectedClient.ciudad}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">
                        Correo Electrónico
                      </label>
                      <p className="font-medium">{selectedClient.correo}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Teléfono</label>
                      <p className="font-medium">{selectedClient.telefono}</p>
                    </div>
                    {selectedClient.celular && (
                      <div>
                        <label className="text-sm text-gray-500">Celular</label>
                        <p className="font-medium">{selectedClient.celular}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Documentación
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">
                        Tipo de Documento
                      </label>
                      <p className="font-medium">{selectedClient.documento}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Número de Documento
                      </label>
                      <p className="font-medium">{selectedClient.numeroDocumento}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">NIT</label>
                      <p className="font-medium font-mono">{selectedClient.nit}</p>
                    </div>
                    {selectedClient.ncr && (
                      <div>
                        <label className="text-sm text-gray-500">NCR</label>
                        <p className="font-medium">{selectedClient.ncr}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Información Adicional
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">
                        Fecha de Registro
                      </label>
                      <p className="font-medium">{selectedClient.fechaRegistro}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Editar Cliente
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
