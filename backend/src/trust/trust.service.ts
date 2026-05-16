import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { SquadService } from '../squad/squad.service'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class TrustService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly squadService: SquadService,
  ) {}

  async getScore(virtualAccountNumber: string) {
    const txnData = await this.squadService.getTransactions(virtualAccountNumber)
    const transactions = txnData.data ?? []

    const res = await firstValueFrom(
      this.http.post(`${this.config.getOrThrow('AI_SERVICE_URL')}/trust-score`, {
        transactions,
      }),
    )

    return res.data
  }
}
