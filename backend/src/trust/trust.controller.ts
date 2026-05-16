import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { TrustService } from './trust.service'
import { TrustScoreResponseDto } from './dto/trust-score-response.dto'

@ApiTags('Trust')
@Controller('trust')
export class TrustController {
  constructor(private readonly trustService: TrustService) {}

  @Get(':virtualAccountNumber')
  @ApiOperation({
    summary: 'Get AI-computed trust score for a virtual account',
  })
  @ApiParam({
    name: 'virtualAccountNumber',
    description: 'Squad virtual account number',
    example: 'SQD-1234567890',
  })
  @ApiResponse({
    status: 200,
    type: TrustScoreResponseDto,
    description: 'Trust score computed from transaction history',
  })
  @ApiResponse({
    status: 500,
    description: 'Squad transaction fetch failed or AI service unavailable',
  })
  getScore(@Param('virtualAccountNumber') virtualAccountNumber: string) {
    return this.trustService.getScore(virtualAccountNumber)
  }
}
