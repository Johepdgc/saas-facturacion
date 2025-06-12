import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './clerk.guard';
import type { Request as ExpressRequest } from 'express';
import type { User } from '@prisma/client';

// Define the authenticated request interface
interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    sessionId: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(ClerkAuthGuard)
  async getCurrentUser(@Request() req: AuthenticatedRequest): Promise<User | null> {
    const clerkId = req.user.userId;
    const user = await this.authService.getCurrentUser(clerkId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Get('sync')
  @UseGuards(ClerkAuthGuard)
  async syncUser(@Request() req: AuthenticatedRequest): Promise<User> {
    const clerkId = req.user.userId;
    return this.authService.syncUser(clerkId);
  }
}
