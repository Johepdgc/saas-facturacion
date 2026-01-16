import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { AuthService } from '../auth/auth.service';
import { ClerkAuthGuard } from '../auth/clerk.guard';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

interface AuthenticatedRequest extends Request {
  user: { userId: string };
}

@Controller('invoices')
@UseGuards(ClerkAuthGuard)
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const companyId = await this.getCompanyId(req);
    return this.invoicesService.create(createInvoiceDto, companyId);
  }

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const companyId = await this.getCompanyId(req);
    return this.invoicesService.findAll(companyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const companyId = await this.getCompanyId(req);
    return this.invoicesService.findOne(id, companyId);
  }

  // 🔒 Método privado reutilizable
  private async getCompanyId(req: AuthenticatedRequest): Promise<string> {
    const user = await this.authService.getCurrentUser(req.user.userId);
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new NotFoundException('No active company found');
    }

    return companyId;
  }

  @Post(':id/firmar')
  async validateAndSign(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const companyId = await this.getCompanyId(req);

    try {
      const { dte } = await this.invoicesService.validateDte(id, companyId);

      // 🔜 En el siguiente paso: enviar este `dte` al microservicio de firma electrónica
      return {
        message: 'DTE is valid and ready for signing',
        dte,
      };
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      let details: unknown[] | null = null;

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (typeof error === 'object' && error !== null && 'response' in error) {
        const resp = (error as { response: unknown }).response;
        if (
          typeof resp === 'object' &&
          resp !== null &&
          'errors' in resp &&
          Array.isArray((resp as { errors: unknown }).errors)
        ) {
          details = (resp as { errors: unknown[] }).errors;
        }
      }

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'DTE validation failed',
          error: errorMessage,
          details,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
