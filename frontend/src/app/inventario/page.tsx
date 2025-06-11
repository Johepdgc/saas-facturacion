"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

// Inventory item type
type InventoryItem = {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  unidad: string;
  proveedor: string;
  fechaIngreso: string;
};

// Sample inventory data
const initialInventory: InventoryItem[] = [
  {
    id: 1,
    codigo: "PROD001",
    nombre: "Laptop Dell Inspiron",
    descripcion: "Laptop Dell Inspiron 15 3000 Series",
    categoria: "Electrónicos",
    precio: 650.0,
    stock: 15,
    stockMinimo: 5,
    unidad: "Unidad",
    proveedor: "Dell Inc.",
    fechaIngreso: "2025-01-01",
  },
  {
    id: 2,
    codigo: "PROD002",
    nombre: "Mouse Inalámbrico",
    descripcion: "Mouse inalámbrico Logitech M185",
    categoria: "Accesorios",
    precio: 25.99,
    stock: 45,
    stockMinimo: 10,
    unidad: "Unidad",
    proveedor: "Logitech",
    fechaIngreso: "2025-01-02",
  },
  {
    id: 3,
    codigo: "PROD003",
    nombre: "Teclado Mecánico",
    descripcion: "Teclado mecánico RGB Corsair K70",
    categoria: "Accesorios",
    precio: 120.0,
    stock: 3,
    stockMinimo: 5,
    unidad: "Unidad",
    proveedor: "Corsair",
    fechaIngreso: "2025-01-03",
  },
];

export default function Inventario() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, "id">>({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: 0,
    stock: 0,
    stockMinimo: 0,
    unidad: "Unidad",
    proveedor: "",
    fechaIngreso: new Date().toISOString().split("T")[0],
  });

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  // Add new item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(...inventory.map((item) => item.id)) + 1;
    setInventory([
      ...inventory,
      {
        ...newItem,
        id,
        precio: Number(newItem.precio),
        stock: Number(newItem.stock),
        stockMinimo: Number(newItem.stockMinimo),
      },
    ]);
    setNewItem({
      codigo: "",
      nombre: "",
      descripcion: "",
      categoria: "",
      precio: 0,
      stock: 0,
      stockMinimo: 0,
      unidad: "Unidad",
      proveedor: "",
      fechaIngreso: new Date().toISOString().split("T")[0],
    });
    setShowAddForm(false);
  };

  // Edit item
  const handleEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setInventory(
        inventory.map((item) =>
          item.id === editingItem.id
            ? {
                ...editingItem,
                precio: Number(editingItem.precio),
                stock: Number(editingItem.stock),
                stockMinimo: Number(editingItem.stockMinimo),
              }
            : item
        )
      );
      setEditingItem(null);
    }
  };

  // Delete item
  const handleDeleteItem = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  // Get stock status color
  const getStockStatus = (stock: number, stockMinimo: number) => {
    if (stock <= stockMinimo) return "text-red-600 bg-red-100";
    if (stock <= stockMinimo * 2) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar active="inventario" />
      <main className="flex-1 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <input
              type="text"
              className="border rounded px-4 py-2 pl-10 w-full"
              placeholder="Buscar productos..."
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

        {/* Title and Add Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Inventario</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar Producto
          </button>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon
                icon={faBox}
                className="text-blue-600 text-2xl"
              />
              <h3 className="text-lg font-semibold">Total Productos</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {inventory.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon
                icon={faBox}
                className="text-green-600 text-2xl"
              />
              <h3 className="text-lg font-semibold">Stock Total</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {inventory.reduce((sum, item) => sum + item.stock, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon icon={faBox} className="text-red-600 text-2xl" />
              <h3 className="text-lg font-semibold">Stock Bajo</h3>
            </div>
            <p className="text-3xl font-bold text-red-600">
              {
                inventory.filter((item) => item.stock <= item.stockMinimo)
                  .length
              }
            </p>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Proveedor</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.codigo}</td>
                    <td className="px-4 py-3">{item.nombre}</td>
                    <td className="px-4 py-3">{item.categoria}</td>
                    <td className="px-4 py-3">${item.precio.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {item.stock} {item.unidad}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStockStatus(
                          item.stock,
                          item.stockMinimo
                        )}`}
                      >
                        {item.stock <= item.stockMinimo
                          ? "Stock Bajo"
                          : item.stock <= item.stockMinimo * 2
                          ? "Stock Medio"
                          : "Stock Normal"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.proveedor}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800"
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
        </div>

        {/* Add Item Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                Agregar Nuevo Producto
              </h2>
              <form
                onSubmit={handleAddItem}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Código
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={newItem.codigo}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={newItem.nombre}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={newItem.descripcion}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categoría
                  </label>
                  <select
                    name="categoria"
                    value={newItem.categoria}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Electrónicos">Electrónicos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Software">Software</option>
                    <option value="Oficina">Oficina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={newItem.precio}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={newItem.stock}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stock Mínimo
                  </label>
                  <input
                    type="number"
                    name="stockMinimo"
                    value={newItem.stockMinimo}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Unidad
                  </label>
                  <select
                    name="unidad"
                    value={newItem.unidad}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Unidad">Unidad</option>
                    <option value="Kilogramo">Kilogramo</option>
                    <option value="Litro">Litro</option>
                    <option value="Metro">Metro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Proveedor
                  </label>
                  <input
                    type="text"
                    name="proveedor"
                    value={newItem.proveedor}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>
              <form
                onSubmit={handleEditItem}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Código
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={editingItem.codigo}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={editingItem.nombre}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={editingItem.descripcion}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categoría
                  </label>
                  <select
                    name="categoria"
                    value={editingItem.categoria}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="Electrónicos">Electrónicos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Software">Software</option>
                    <option value="Oficina">Oficina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={editingItem.precio}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editingItem.stock}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stock Mínimo
                  </label>
                  <input
                    type="number"
                    name="stockMinimo"
                    value={editingItem.stockMinimo}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Proveedor
                  </label>
                  <input
                    type="text"
                    name="proveedor"
                    value={editingItem.proveedor}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
