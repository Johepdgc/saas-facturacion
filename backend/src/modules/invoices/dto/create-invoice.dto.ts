export class ItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
  unit?: string;
}

export class CreateInvoiceDto {
  clientId: string;
  items: ItemDto[];
}
