import { auth } from "@clerk/nextjs/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface InvoiceData {
  clientId: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    unit?: string;
  }>;
}

interface ClientData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

interface CompanyData {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  taxId?: string;
}

interface InventoryItemData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  unit?: string;
}

class ApiService {
  private async getAuthHeaders() {
    try {
      const { getToken } = auth();
      const token = await getToken();

      return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
    } catch (error) {
      console.error("Failed to get auth headers:", error);
      return {
        "Content-Type": "application/json",
      };
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T, D = unknown>(endpoint: string, data: D): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async put<T, D = unknown>(endpoint: string, data: D): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async createInvoice(data: InvoiceData) {
    return this.post("/invoices", data);
  }

  async createClient(data: ClientData) {
    return this.post("/clients", data);
  }

  async getInvoices() {
    return this.get("/invoices");
  }

  async updateCompany(data: CompanyData) {
    return this.put("/auth/company", data);
  }

  async updateProfile(data: ProfileData) {
    return this.put("/auth/profile", data);
  }

  async syncUser() {
    return this.get("/auth/sync");
  }

  async createInventoryItem(data: InventoryItemData) {
    return this.post("/inventory", data);
  }

  async updateInventoryItem(id: string, data: Partial<InventoryItemData>) {
    return this.put(`/inventory/${id}`, data);
  }

  async deleteInventoryItem(id: string) {
    return this.delete(`/inventory/${id}`);
  }
}

export const apiService = new ApiService();
