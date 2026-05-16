import { Controller, Get, Query } from '@nestjs/common'
import { OpportunitiesService } from './opportunities.service'

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get('match')
  match(
    @Query('skills') skills: string,
    @Query('location') location: string,
    @Query('languages') languages: string,
  ) {
    return this.opportunitiesService.match(
      skills ? skills.split(',') : [],
      location,
      languages ? languages.split(',') : [],
    )
  }
}
