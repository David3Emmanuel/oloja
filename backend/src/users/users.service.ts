import { Injectable } from '@nestjs/common'
import { SquadService } from '../squad/squad.service'
import { PrismaService } from '../prisma/prisma.service'
import { OnboardUserDto } from './dto/onboard-user.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly squadService: SquadService,
    private readonly prisma: PrismaService,
  ) {}

  async onboard(dto: OnboardUserDto) {
    const squadAccount = await this.squadService.createVirtualAccount({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      bvn: dto.bvn,
    })

    const va = squadAccount.data ?? {}
    const user = await this.prisma.user.create({
      data: {
        id: `USR-${Date.now()}`,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        role: dto.role,
        brandName: dto.brandName,
        location: dto.location,
        languages: dto.languages,
        skills: dto.skills,
        experience: dto.experience,
        jobType: dto.jobType,
        workType: dto.workType,
        workDistance: dto.workDistance,
        accountNumber: (va as Record<string, string>).account_number ?? null,
        bankName: (va as Record<string, string>).bank_name ?? null,
        accountName: `${dto.firstName} ${dto.lastName}`,
        trustScore: 0,
      },
    })

    return {
      ...user,
      virtualAccount: {
        accountNumber: user.accountNumber,
        bankName: user.bankName,
        accountName: user.accountName,
      },
    }
  }

  findById(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } })
  }
}
