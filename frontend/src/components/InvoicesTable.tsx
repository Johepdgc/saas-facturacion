import React from "react";

type Invoice = {
  cliente: string;
  dte: string;
  estado: string;
  tipo: string;
  fecha: string;
  tipoDocumento: string;
  documento: string;
  correo: string;
  telefono: string;
  total: string;
};

export default function InvoicesTable({ data }: { data: Invoice[] }) {
  return (
    <div className="w-full">
      {/* Responsive height container that adapts to available space */}
      <div className="overflow-auto max-h-[50vh] min-h-[300px] border border-gray-200 rounded-xl">
        <table className="min-w-[1400px] w-full text-sm text-left text-gray-700">
          {/* Sticky header */}
          <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left w-[180px] font-semibold border-r border-gray-200">
                Cliente
              </th>
              <th className="px-4 py-3 text-left w-[280px] font-semibold border-r border-gray-200">
                DTE
              </th>
              <th className="px-4 py-3 text-left w-[120px] font-semibold border-r border-gray-200">
                Estado
              </th>
              <th className="px-4 py-3 text-left w-[130px] font-semibold border-r border-gray-200">
                Tipo de DTE
              </th>
              <th className="px-4 py-3 text-left w-[140px] font-semibold border-r border-gray-200">
                Fecha de emisión
              </th>
              <th className="px-4 py-3 text-left w-[160px] font-semibold border-r border-gray-200">
                Tipo de Documento de Identidad
              </th>
              <th className="px-4 py-3 text-left w-[180px] font-semibold border-r border-gray-200">
                Documento de Identificación
              </th>
              <th className="px-4 py-3 text-left w-[200px] font-semibold border-r border-gray-200">
                Correo Electrónico
              </th>
              <th className="px-4 py-3 text-left w-[140px] font-semibold border-r border-gray-200">
                Teléfono
              </th>
              <th className="px-4 py-3 text-left w-[100px] font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((factura, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 border-r border-gray-100 w-[180px]">
                  <div className="font-medium text-gray-900 truncate">
                    {factura.cliente}
                  </div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 w-[280px]">
                  <div className="font-mono text-xs text-gray-700 break-all">
                    {factura.dte}
                  </div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 w-[120px]">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                      factura.estado === "PROCESADO"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {factura.estado}
                  </span>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 font-medium w-[130px]">
                  <div className="truncate">{factura.tipo}</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 w-[140px]">
                  <div className="whitespace-nowrap">{factura.fecha}</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 w-[160px]">
                  <div className="truncate">{factura.tipoDocumento}</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 font-mono text-sm w-[180px]">
                  <div className="truncate">{factura.documento}</div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 w-[200px]">
                  <div className="text-blue-600 hover:text-blue-800 transition-colors truncate">
                    {factura.correo}
                  </div>
                </td>
                <td className="px-4 py-3 border-r border-gray-100 font-mono w-[140px]">
                  <div className="whitespace-nowrap">{factura.telefono}</div>
                </td>
                <td className="px-4 py-3 font-bold text-green-600 w-[100px]">
                  <div className="whitespace-nowrap">{factura.total}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table info footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Mostrando {data.length} facturas</div>
        <div className="flex items-center gap-2">
          <span>💡</span>
          <span>Desplázate para ver todo el contenido</span>
        </div>
      </div>
    </div>
  );
}
