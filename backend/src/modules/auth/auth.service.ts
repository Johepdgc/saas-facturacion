import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { createClerkClient, User } from '@clerk/backend';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Type-safe DTOs (move to separate DTO files if preferred)
interface UpdateUserProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  imageUrl?: string;
}

interface UpdateCompanyDto {
  name?: string;
  logoUrl?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(clerkId: string) {
    let clerkUser: User;
    try {
      clerkUser = await clerkClient.users.getUser(clerkId);
    } catch (err) {
      throw new BadRequestException(
        `Unable to fetch user from Clerk: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    }

    let user = await this.prisma.user.findUnique({
      where: { clerkId },
      include: { companies: true },
    });

    if (!user) {
      // Create user and default company
      user = await this.prisma.user.create({
        data: {
          clerkId,
          email: clerkUser?.emailAddresses?.[0]?.emailAddress ?? '',
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          imageUrl: clerkUser.imageUrl,
          phone: clerkUser.phoneNumbers?.[0]?.phoneNumber,
        },
        include: { companies: true },
      });

      await this.prisma.company.create({
        data: {
          name: `${clerkUser?.firstName?.trim() ?? 'Mi'} Empresa`,
          ownerId: user.id,
        },
      });
    }

    return this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        companies: {
          where: { isActive: true },
          include: {
            clients: { take: 5 },
            invoices: { take: 5, orderBy: { createdAt: 'desc' } },
            inventory: { take: 5 },
          },
        },
      },
    });
  }

  async updateUserProfile(clerkId: string, data: UpdateUserProfileDto) {
    return this.prisma.user.update({
      where: { clerkId },
      data,
    });
  }

  async updateCompany(clerkId: string, companyData: UpdateCompanyDto) {
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
      include: { companies: true },
    });

    const activeCompany = user?.companies[0];
    if (!activeCompany) {
      throw new NotFoundException('Active company not found for this user');
    }

    return this.prisma.company.update({
      where: { id: activeCompany.id },
      data: companyData,
    });
  }
}
