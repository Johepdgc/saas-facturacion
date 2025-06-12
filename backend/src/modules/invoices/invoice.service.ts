import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

const IVA_RATE = 0.13;

interface CreateInvoiceDto {
  clientId: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    unit?: string;
  }[];
  [key: string]: any; // for other invoice fields like date, reference, etc.
}

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto, companyId: string) {
    const { clientId, items, ...invoiceMeta } = createInvoiceDto;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new BadRequestException('Invoice must contain at least one item.');
    }

    // Validate items
    for (const item of items) {
      if (item.quantity <= 0 || item.unitPrice <= 0) {
        throw new BadRequestException(
          'Quantity and unit price must be greater than zero.',
        );
      }
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    // Generate DTE fields
    const generationCode = uuidv4().toUpperCase();
    const now = new Date();
    const transmissionTime = now.toISOString().split('T')[1].split('.')[0]; // HH:mm:ss

    return this.prisma.invoice.create({
      data: {
        ...invoiceMeta,
        generationCode,
        transmissionTime,
        clientId,
        companyId,
        subtotal,
        iva,
        total,
        inWords: this.numberToWords(total),
        items: {
          create: items.map((item, index) => ({
            itemNumber: index + 1,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.quantity * item.unitPrice,
            taxes: item.quantity * item.unitPrice * IVA_RATE,
            total: item.quantity * item.unitPrice * (1 + IVA_RATE),
            unit: item.unit ?? 'UNIDAD',
          })),
        },
      },
      include: {
        items: true,
        client: true,
        company: true,
      },
    });
  }

  async findAll(companyId: string) {
    return this.prisma.invoice.findMany({
      where: { companyId },
      include: {
        items: true,
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, companyId: string) {
    return this.prisma.invoice.findFirst({
      where: { id, companyId },
      include: {
        items: true,
        client: true,
        company: true,
      },
    });
  }

  private numberToWords(amount: number): string {
    // Replace this with a complete number-to-words conversion (in Spanish)
    return `${amount.toFixed(2)} DÓLARES`;
  }
}
