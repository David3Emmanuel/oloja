import { Injectable, NotFoundException } from '@nestjs/common'
import { MatchingService } from '../ai/matching.service'
import { UsersService } from '../users/users.service'
import { SEED_OPPORTUNITIES } from './opportunities.seed'

@Injectable()
export class OpportunitiesService {
  constructor(
    private readonly matching: MatchingService,
    private readonly users: UsersService,
  ) {}

  async match(userId: string) {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException(`User ${userId} not found`)
    const matches = await this.matching.match(
      user.skills,
      user.location,
      user.languages,
      SEED_OPPORTUNITIES,
    )
    return { matches }
  }
}
