import { Injectable } from '@nestjs/common'
import { SquadService } from '../squad/squad.service'
import { OnboardUserDto } from './dto/onboard-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly squadService: SquadService) {}

  async onboard(dto: OnboardUserDto) {
    const squadAccount = await this.squadService.createVirtualAccount({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      bvn: dto.bvn,
    })

    return {
      userId: `USR-${Date.now()}`,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      role: dto.role,
      skills: dto.skills,
      languages: dto.languages,
      location: dto.location,
      experience: dto.experience,
      virtualAccount: squadAccount.data,
      trustScore: 0,
      createdAt: new Date().toISOString(),
    }
  }
}
