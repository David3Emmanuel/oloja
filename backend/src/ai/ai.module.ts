import { Module } from '@nestjs/common'
import { MatchingService } from './matching.service'
import { TrustScoreService } from './trust-score.service'

@Module({
  providers: [MatchingService, TrustScoreService],
  exports: [MatchingService, TrustScoreService],
})
export class AiModule {}
