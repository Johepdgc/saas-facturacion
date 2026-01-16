import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClerkAuthGuard } from './clerk.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ClerkAuthGuard],
  exports: [ClerkAuthGuard, AuthService],
})
export class AuthModule {}
