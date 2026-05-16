import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Anthropic from '@anthropic-ai/sdk'

export interface MatchReason {
  type: 'ai' | 'location' | 'experience' | 'skills'
  title: string
  description: string
}

export interface ScoredOpportunity {
  matchScore: number
  matchReasons: MatchReason[]
  [key: string]: unknown
}

@Injectable()
export class MatchingService {
  private readonly client: Anthropic

  constructor(private readonly config: ConfigService) {
    this.client = new Anthropic({
      apiKey: this.config.get('ANTHROPIC_API_KEY'),
    })
  }

  async match(
    skills: string[],
    location: string,
    languages: string[],
    opportunities: any[],
  ): Promise<ScoredOpportunity[]> {
    try {
      return await this._claudeMatch(skills, location, languages, opportunities)
    } catch {
      return this._algorithmicMatch(skills, location, languages, opportunities)
    }
  }

  // ── Claude-powered matching ───────────────────────────────────────────────

  private async _claudeMatch(
    skills: string[],
    location: string,
    languages: string[],
    opportunities: any[],
  ): Promise<ScoredOpportunity[]> {
    const prompt = `You are a job matching engine for informal workers in Nigeria.

User profile:
- Skills: ${skills.join(', ')}
- Location: ${location}
- Languages: ${languages.join(', ')}

Opportunities:
${JSON.stringify(opportunities, null, 2)}

For each opportunity, evaluate how well it matches the user's profile considering:
1. Skill overlap (semantic, not just exact — "tailor" covers "tailoring", "seamstress", "sewing")
2. Location proximity (same city/area scores highest; nearby areas score medium)
3. Language fit (user's languages vs opportunity language)

Return ONLY a valid JSON array with one object per opportunity in the same order, each with:
- "id": the opportunity id
- "matchScore": integer 0–100
- "matchReasons": array of 1–3 objects, each with "type" ("skills"|"location"|"experience"), "title" (short), "description" (one sentence explaining the match)`

    const message = await this.client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text
    const parsed: {
      id: string
      matchScore: number
      matchReasons: MatchReason[]
    }[] = JSON.parse(text)

    const scoreMap = new Map(parsed.map((p) => [p.id, p]))

    return opportunities
      .map((opp) => {
        const scored = scoreMap.get(opp.id)
        return {
          ...opp,
          matchScore: scored?.matchScore ?? 0,
          matchReasons: scored?.matchReasons ?? [],
        }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  // ── Algorithmic fallback (Jaccard + weighted scoring) ─────────────────────

  private _algorithmicMatch(
    skills: string[],
    location: string,
    languages: string[],
    opportunities: any[],
  ): ScoredOpportunity[] {
    return opportunities
      .map((opp) => ({
        ...opp,
        matchScore: Math.round(
          this._score(skills, location, languages, opp) * 100,
        ),
        matchReasons: [],
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  private _score(
    skills: string[],
    location: string,
    languages: string[],
    opp: any,
  ): number {
    return (
      0.55 * this._skillOverlap(skills, opp.skills) +
      0.25 * this._locationScore(location, opp.location) +
      0.2 * this._languageScore(languages, opp.language)
    )
  }

  private _skillOverlap(a: string[], b: string[]): number {
    if (!a.length || !b.length) return 0
    const aSet = new Set(a.map((s) => s.toLowerCase()))
    const bSet = new Set(b.map((s) => s.toLowerCase()))
    const intersection = [...aSet].filter((s) => bSet.has(s)).length
    const union = new Set([...aSet, ...bSet]).size
    return intersection / union
  }

  private _locationScore(userLoc: string, oppLoc: string): number {
    const u = userLoc.toLowerCase()
    const o = oppLoc.toLowerCase()
    if (u === o) return 1.0
    // partial match — one contains the other (e.g. "Ikeja" in "Ikeja Lagos")
    if (u.includes(o) || o.includes(u)) return 0.7
    return 0.3
  }

  private _languageScore(userLangs: string[], oppLang: string): number {
    const langs = new Set(userLangs.map((l) => l.toLowerCase()))
    const opp = oppLang.toLowerCase()
    if (langs.has(opp)) return 1.0
    if (opp === 'english') return 0.7
    return 0.2
  }
}
