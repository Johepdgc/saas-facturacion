"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api";

export default function CrearProducto() {
  const { getToken } = useAuth();
  const router = useRouter();

  const [newItem, setNewItem] = useState({
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await apiService.createInventoryItem(newItem, token);
      router.push("/inventario");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al agregar producto. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Producto</h1>
      <form
        onSubmit={handleAddItem}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Código</label>
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
          <label className="block text-sm font-medium mb-1">Nombre</label>
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
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={newItem.descripcion}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
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
          <label className="block text-sm font-medium mb-1">Precio</label>
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
          <label className="block text-sm font-medium mb-1">Stock</label>
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
          <label className="block text-sm font-medium mb-1">Stock Mínimo</label>
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
          <label className="block text-sm font-medium mb-1">Unidad</label>
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
          <label className="block text-sm font-medium mb-1">Proveedor</label>
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
            onClick={() => router.push("/inventario")}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
