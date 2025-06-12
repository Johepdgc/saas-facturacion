import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { ClerkAuthGuard } from '../../auth/clerk.guard';
import { AuthService } from '../../auth/auth.service';

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
    @Body() createInvoiceDto: any,
    @Request() req: AuthenticatedRequest,
  ) {
    // Get user's company
    const user = await this.authService.getCurrentUser(req.user.userId);
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new Error('No active company found');
    }

    return this.invoicesService.create(createInvoiceDto, companyId);
  }

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const user = await this.authService.getCurrentUser(req.user.userId);
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      return [];
    }

    return this.invoicesService.findAll(companyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const user = await this.authService.getCurrentUser(req.user.userId);
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new Error('No active company found');
    }

    return this.invoicesService.findOne(id, companyId);
  }
}
