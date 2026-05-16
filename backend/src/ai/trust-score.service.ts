import { Injectable } from '@nestjs/common'

interface Transaction {
  amount: number
  type: string // "credit" | "debit"
  date: string // ISO string (Squad format)
  status: string // "successful" | "failed" | "pending"
}

export interface TrustScoreResult {
  score: number
  tier: 'Bronze' | 'Silver' | 'Gold'
  breakdown: Record<string, number | string>
  unlocks: string[]
}

@Injectable()
export class TrustScoreService {
  compute(transactions: Transaction[]): TrustScoreResult {
    if (!transactions.length) {
      return {
        score: 15,
        tier: 'Bronze',
        breakdown: { reason: 'No transaction history yet' },
        unlocks: [],
      }
    }

    const successful = transactions.filter((t) => t.status === 'successful')
    const credits = successful.filter((t) => t.type === 'credit')

    // 1. Volume — caps at 50 completed transactions
    const volumeScore = Math.min(successful.length / 50, 1.0)

    // 2. Consistency — inverse coefficient of variation on credit amounts
    let consistencyScore = 0.3
    if (credits.length > 1) {
      const amounts = credits.map((t) => t.amount)
      const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length
      const std = this._std(amounts)
      const cv = std / (mean + 1)
      consistencyScore = Math.max(0, 1 - cv)
    }

    // 3. Recency — exponential decay (e^(-days/30)), so old txns still contribute
    let recencyScore = 0
    if (successful.length) {
      try {
        const dates = successful
          .map((t) => new Date(t.date).getTime())
          .filter(Boolean)
        const latestMs = Math.max(...dates)
        const daysSince = (Date.now() - latestMs) / 86_400_000
        recencyScore = Math.exp(-daysSince / 30)
      } catch {
        recencyScore = 0.5
      }
    }

    // 4. Reliability — successful vs total
    const reliabilityScore = successful.length / transactions.length

    // 5. Growth trend — last 30 days vs prior 30 days credit volume
    const growthBonus = this._growthBonus(credits)

    const weights = {
      volume: 0.25,
      consistency: 0.3,
      recency: 0.25,
      reliability: 0.2,
    }
    const raw =
      weights.volume * volumeScore +
      weights.consistency * consistencyScore +
      weights.recency * recencyScore +
      weights.reliability * reliabilityScore

    const finalScore = Math.min(100, Math.round(raw * 100) + growthBonus)

    const unlocks: string[] = []
    if (finalScore >= 20) unlocks.push('Digital wallet')
    if (finalScore >= 40) unlocks.push('Savings account')
    if (finalScore >= 60) unlocks.push('Micro-credit (up to ₦50,000)')
    if (finalScore >= 80) unlocks.push('Insurance products')

    const tier: 'Bronze' | 'Silver' | 'Gold' =
      finalScore < 40 ? 'Bronze' : finalScore < 70 ? 'Silver' : 'Gold'

    return {
      score: finalScore,
      tier,
      breakdown: {
        volume: Math.round(volumeScore * 100),
        consistency: Math.round(consistencyScore * 100),
        recency: Math.round(recencyScore * 100),
        reliability: Math.round(reliabilityScore * 100),
      },
      unlocks,
    }
  }

  // Credits in last 30 days vs prior 30 days — bonus up to +10 points
  private _growthBonus(credits: Transaction[]): number {
    const now = Date.now()
    const day = 86_400_000
    const recent = credits
      .filter((t) => now - new Date(t.date).getTime() <= 30 * day)
      .reduce((s, t) => s + t.amount, 0)
    const prior = credits
      .filter((t) => {
        const age = now - new Date(t.date).getTime()
        return age > 30 * day && age <= 60 * day
      })
      .reduce((s, t) => s + t.amount, 0)

    if (!prior) return recent > 0 ? 5 : 0
    const growth = (recent - prior) / prior
    return Math.min(10, Math.max(0, Math.round(growth * 10)))
  }

  private _std(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const variance =
      values.reduce((s, x) => s + (x - mean) ** 2, 0) / values.length
    return Math.sqrt(variance)
  }
}
