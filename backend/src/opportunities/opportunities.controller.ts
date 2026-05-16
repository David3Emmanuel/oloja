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
    name: 'userId',
    required: true,
    description: 'The user ID returned from /users/onboard',
    example: 'USR-1748000000000',
  })
  @ApiResponse({
    status: 200,
    type: OpportunityMatchResponseDto,
    description: 'Opportunities ranked by AI match score',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  match(@Query('userId') userId: string) {
    return this.opportunitiesService.match(userId)
  }
}
