import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { SEED_OPPORTUNITIES } from './opportunities.seed'

@Injectable()
export class OpportunitiesService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async match(skills: string[], location: string, languages: string[]) {
    try {
      const res = await firstValueFrom(
        this.http.post(`${this.config.getOrThrow('AI_SERVICE_URL')}/match`, {
          skills,
          location,
          languages,
          opportunities: SEED_OPPORTUNITIES,
        }),
      )
      return { matches: res.data.matches }
    } catch {
      return { matches: SEED_OPPORTUNITIES, fallback: true }
    }
  }
}
