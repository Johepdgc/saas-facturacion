export class CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  documentType: string;
  documentNumber: string;
  personType: string;
}
