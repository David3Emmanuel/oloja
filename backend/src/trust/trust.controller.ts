import { Controller, Get, Param } from '@nestjs/common'
import { TrustService } from './trust.service'

@Controller('trust')
export class TrustController {
  constructor(private readonly trustService: TrustService) {}

  @Get(':virtualAccountNumber')
  getScore(@Param('virtualAccountNumber') virtualAccountNumber: string) {
    return this.trustService.getScore(virtualAccountNumber)
  }
}
