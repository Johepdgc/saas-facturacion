import {
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum InvoiceType {
  FACTURA = 'FACTURA',
  CREDITO_FISCAL = 'CREDITO_FISCAL',
  NOTA_CREDITO = 'NOTA_CREDITO',
  NOTA_DEBITO = 'NOTA_DEBITO',
}

export class CreateInvoiceItemDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precioUnitario: number;
}

export class CreateInvoiceDto {
  @IsString()
  clientId: string;

  @IsEnum(InvoiceType)
  tipo: InvoiceType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}
