import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InvoicesTable from "@/components/InvoicesTable";

const facturas = [
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "RECHAZADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "RECHAZADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-01",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
];

export default function Facturas() {
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
