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
  private async getAuthHeaders(tokenOverride?: string) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (tokenOverride) {
      headers["Authorization"] = `Bearer ${tokenOverride}`;
    }

    return headers;
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers = await this.getAuthHeaders(token);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T, D = unknown>(
    endpoint: string,
    data: D,
    token?: string
  ): Promise<T> {
    const headers = await this.getAuthHeaders(token);
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

  async put<T, D = unknown>(
    endpoint: string,
    data: D,
    token?: string
  ): Promise<T> {
    const headers = await this.getAuthHeaders(token);
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

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const headers = await this.getAuthHeaders(token);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async createInvoice(data: InvoiceData, token?: string) {
    return this.post("/invoices", data, token);
  }

  async createClient(data: ClientData, token?: string) {
    return this.post("/clients", data, token);
  }

  async getInvoices(token?: string) {
    return this.get("/invoices", token);
  }

  async updateCompany(data: CompanyData, token?: string) {
    return this.put("/auth/company", data, token);
  }

  async updateProfile(data: ProfileData, token?: string) {
    return this.put("/auth/profile", data, token);
  }

  async syncUser(token?: string) {
    return this.get("/auth/sync", token);
  }

  async createInventoryItem(data: InventoryItemData, token?: string) {
    return this.post("/inventory", data, token);
  }

  async updateInventoryItem(
    id: string,
    data: Partial<InventoryItemData>,
    token?: string
  ) {
    return this.put(`/inventory/${id}`, data, token);
  }

  async deleteInventoryItem(id: string, token?: string) {
    return this.delete(`/inventory/${id}`, token);
  }

  async getInventory(token?: string) {
    return this.get("/inventory", token);
  }
}

export const apiService = new ApiService();
