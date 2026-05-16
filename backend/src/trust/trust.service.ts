import { Injectable } from '@nestjs/common'
import { SquadService } from '../squad/squad.service'
import { TrustScoreService } from '../ai/trust-score.service'

@Injectable()
export class TrustService {
  constructor(
    private readonly squadService: SquadService,
    private readonly trustScore: TrustScoreService,
  ) {}

  async getScore(virtualAccountNumber: string) {
    const txnData =
      await this.squadService.getTransactions(virtualAccountNumber)
    return this.trustScore.compute(txnData.data ?? [])
  }
}
