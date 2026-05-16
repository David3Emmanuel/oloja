import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { OpportunitiesService } from './opportunities.service'
import { OpportunityMatchResponseDto } from './dto/opportunity-match-response.dto'

@ApiTags('Opportunities')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get('match')
  @ApiOperation({ summary: 'Find matching gig opportunities for a worker' })
  @ApiQuery({
    name: 'skills',
    required: false,
    description: 'Comma-separated list of skills',
    example: 'plumbing,tiling',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'Worker location used for proximity matching',
    example: 'Lagos',
  })
  @ApiQuery({
    name: 'languages',
    required: false,
    description: 'Comma-separated preferred languages',
    example: 'English,Yoruba',
  })
  @ApiResponse({
    status: 200,
    type: OpportunityMatchResponseDto,
    description:
      'Ranked opportunity matches; fallback:true when AI service was unreachable',
  })
  @ApiResponse({
    status: 500,
    description: 'AI_SERVICE_URL environment variable not configured',
  })
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
