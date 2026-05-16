import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class SquadService {
  private readonly baseUrl: string
  private readonly headers: Record<string, string>

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.getOrThrow('SQUAD_BASE_URL')
    this.headers = {
      Authorization: `Bearer ${this.config.getOrThrow('SQUAD_SECRET_KEY')}`,
      'Content-Type': 'application/json',
    }
  }

  async createVirtualAccount(data: {
    firstName: string
    lastName: string
    email?: string
    phone: string
    bvn: string
  }) {
    const res = await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/virtual-account`,
        {
          first_name: data.firstName,
          last_name: data.lastName,
          mobile_num: data.phone,
          email: data.email,
          bvn: data.bvn,
          is_permanent: true,
          transaction_ref: `OLJ-${Date.now()}`,
        },
        { headers: this.headers },
      ),
    )
    return res.data
  }

  async getTransactions(virtualAccountNumber: string) {
    const res = await firstValueFrom(
      this.http.get(
        `${this.baseUrl}/virtual-account/transactions/${virtualAccountNumber}`,
        { headers: this.headers },
      ),
    )
    return res.data
  }

  async initiateTransfer(data: {
    accountNumber: string
    bankCode: string
    amount: number
    narration: string
  }) {
    const res = await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/payout/initiate`,
        {
          account_number: data.accountNumber,
          bank_code: data.bankCode,
          amount: data.amount * 100, // kobo
          narration: data.narration,
          transaction_ref: `OLJ-OUT-${Date.now()}`,
          currency_id: 'NGN',
        },
        { headers: this.headers },
      ),
    )
    return res.data
  }

  async getWalletBalance() {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/merchant/balance`, {
        headers: this.headers,
      }),
    )
    return res.data
  }
}
