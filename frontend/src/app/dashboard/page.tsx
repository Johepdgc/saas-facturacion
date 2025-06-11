import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBox } from "@fortawesome/free-solid-svg-icons";
import InvoicesTable from "@/components/InvoicesTable";

const facturas = [
	{
		cliente: "Johep Daniel Gradis Cortes",
		dte: "5D394BCD-CFFD-4D2B-B3C4-1C76A831C317",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-02",
		tipoDocumento: "DUI",
		documento: "06540720-9",
		correo: "example@example.com",
		telefono: "+503 61031008",
		total: "$500.00",
	},
	{
		cliente: "Maria Rodriguez",
		dte: "8E394BCD-CFFD-4D2B-B3C4-1C76A831C318",
		estado: "PROCESADO",
		tipo: "FACTURA",
		fecha: "2025-01-02",
		tipoDocumento: "DUI",
		documento: "12345678-9",
		correo: "maria@example.com",
		telefono: "+503 61031009",
		total: "$300.00",
	},
	{
		cliente: "Carlos Mendez",
		dte: "9F394BCD-CFFD-4D2B-B3C4-1C76A831C319",
		estado: "RECHAZADO",
		tipo: "FACTURA",
		fecha: "2025-01-01", // Yesterday
		tipoDocumento: "DUI",
		documento: "87654321-0",
		correo: "carlos@example.com",
		telefono: "+503 61031010",
		total: "$750.00",
	},
	// Add more invoices with different dates...
];

// Helper function to get today's date in YYYY-MM-DD format
function getTodayDate() {
	const today = new Date();
	return today.toISOString().split("T")[0];
}

// Helper function to filter invoices by today
function getTodayInvoices(invoices: typeof facturas) {
	const today = getTodayDate();
	return invoices.filter((invoice) => invoice.fecha === today);
}

export default function Dashboard() {
	// Filter invoices for today only
	const todayInvoices = getTodayInvoices(facturas);
	const todayDate = new Date().toLocaleDateString("es-ES", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="flex min-h-screen bg-gray-50 overflow-hidden">
			<Sidebar active="inicio" />
			<main className="flex-1 p-12 overflow-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<input
						className="border border-gray-300 rounded px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Value"
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

				<h1 className="text-4xl font-bold mb-8">
					Bienvenido{" "}
					<span className="italic font-normal">nombre comercio</span>
				</h1>

				{/* Today's stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-xl shadow border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Facturas Hoy
						</h3>
						<p className="text-3xl font-bold text-blue-600">
							{todayInvoices.length}
						</p>
						<p className="text-sm text-gray-500">{todayDate}</p>
					</div>
					<div className="bg-white rounded-xl shadow border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Ingresos Hoy
						</h3>
						<p className="text-3xl font-bold text-green-600">
							$
							{todayInvoices
								.reduce(
									(sum, inv) =>
										sum +
										parseFloat(
											inv.total.replace("$", "").replace(",", "")
										),
									0
								)
								.toFixed(2)}
						</p>
						<p className="text-sm text-gray-500">Total del día</p>
					</div>
					<div className="bg-white rounded-xl shadow border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Estado
						</h3>
						<p className="text-3xl font-bold text-gray-600">
							{
								todayInvoices.filter(
									(inv) => inv.estado === "PROCESADO"
								).length
							}
							/{todayInvoices.length}
						</p>
						<p className="text-sm text-gray-500">Procesadas/Total</p>
					</div>
				</div>

				{/* Today's invoices table */}
				<div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
					<div className="mb-4 flex justify-between items-center">
						<h2 className="text-xl font-semibold text-gray-800">
							Facturas de Hoy ({todayInvoices.length})
						</h2>
						{todayInvoices.length === 0 && (
							<span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
								No hay facturas hoy
							</span>
						)}
					</div>
					{todayInvoices.length > 0 ? (
						<InvoicesTable data={todayInvoices} />
					) : (
						<div className="text-center py-12">
							<div className="text-gray-400 text-6xl mb-4">📄</div>
							<h3 className="text-lg font-medium text-gray-500 mb-2">
								No hay facturas emitidas hoy
							</h3>
							<p className="text-gray-400">
								Las facturas aparecerán aquí cuando sean creadas
							</p>
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
							<button className="flex-1 bg-gray-800 text-white rounded py-3 hover:bg-black flex items-center justify-center gap-2 transition-colors">
								Agregar Item
							</button>
							<button className="flex-1 bg-gray-800 text-white rounded py-3 hover:bg-black flex items-center justify-center gap-2 transition-colors">
								Ver Inventario
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
