import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { AuthService } from '../auth/auth.service';
import { ClerkAuthGuard } from '../auth/clerk.guard';
import { Request as ExpressRequest } from 'express';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// Define expected structure from AuthService
interface UserWithCompany {
  id: string;
  companies: { id: string; isActive: boolean }[];
}

// Extend Express request with your user object
interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string };
}

@Controller('clients')
@UseGuards(ClerkAuthGuard)
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: UserWithCompany = await this.authService.getCurrentUser(
      req.user.userId,
    );
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new Error('No active company found');
    }

    return this.clientsService.create(createClientDto, companyId);
  }

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const user: UserWithCompany = await this.authService.getCurrentUser(
      req.user.userId,
    );
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      return [];
    }

    return this.clientsService.findAll(companyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const user: UserWithCompany = await this.authService.getCurrentUser(
      req.user.userId,
    );
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new Error('Client not found');
    }

    return this.clientsService.findOne(id, companyId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user: UserWithCompany = await this.authService.getCurrentUser(
      req.user.userId,
    );
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new Error('No active company found');
    }

    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const user: UserWithCompany = await this.authService.getCurrentUser(
      req.user.userId,
    );
    const companyId = user?.companies?.[0]?.id;

    if (!companyId) {
      throw new Error('No active company found');
    }

    return this.clientsService.remove(id);
  }
}
