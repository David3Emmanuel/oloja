import { Injectable } from '@nestjs/common'
import CreateSquadClient from '@squadco/js'

@Injectable()
export class SquadService {
  private readonly squad: InstanceType<typeof CreateSquadClient>

  constructor() {
    this.squad = new CreateSquadClient(
      process.env.SQUAD_PUBLIC_KEY as string,
      process.env.SQUAD_PRIVATE_KEY as string,
      process.env.NODE_ENV as 'production' | 'development',
    )
  }

  async createVirtualAccount(data: {
    firstName: string
    lastName: string
    middleName?: string
    email?: string
    phone: string
    bvn: string
    dob: string
    gender: '1' | '2'
    address: string
  }) {
    return this.squad.createVirtualAccount({
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName ?? '',
      mobileNumber: data.phone,
      email: data.email ?? '',
      bvn: data.bvn,
      dob: data.dob,
      gender: data.gender,
      address: data.address,
      customerIdentifier: data.phone,
    })
  }

  async getTransactions(virtualAccountNumber: string) {
    const res = await this.squad.findAllMerchantTransactionsByFilter({
      virtualAccount: virtualAccountNumber,
    })

    // Normalize to shape expected by TrustScoreService
    const raw: any[] = (res as any)?.data ?? []
    const data = raw.map((t) => ({
      amount: (t.amount ?? 0) / 100, // kobo → naira
      type: t.transaction_type ?? t.type ?? 'credit',
      date: t.transaction_date ?? t.created_at ?? new Date().toISOString(),
      status: t.transaction_status ?? t.status ?? 'successful',
    }))

    return { data }
  }

  async initiateTransfer(data: {
    accountNumber: string
    bankCode: string
    accountName: string
    amount: number
    narration: string
  }) {
    return this.squad.transferFunds({
      transactionReference: `OLJ-OUT-${Date.now()}`,
      amount: String(data.amount * 100), // naira → kobo
      bankCode: data.bankCode,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      currencyId: 'NGN',
      remark: data.narration,
    })
  }

  async getVirtualAccountBalance(accountNumber: string) {
    return this.squad.getCustomerVirtualAccountDetails(accountNumber)
  }

  async getWalletBalance() {
    return this.squad.getWalletBalance('NGN')
  }
}
