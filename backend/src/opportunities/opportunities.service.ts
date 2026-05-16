import { Injectable } from '@nestjs/common'
import { MatchingService } from '../ai/matching.service'
import { SEED_OPPORTUNITIES } from './opportunities.seed'

@Injectable()
export class OpportunitiesService {
  constructor(private readonly matching: MatchingService) {}

  async match(skills: string[], location: string, languages: string[]) {
    const matches = await this.matching.match(
      skills,
      location,
      languages,
      SEED_OPPORTUNITIES,
    )
    return { matches }
  }
}
