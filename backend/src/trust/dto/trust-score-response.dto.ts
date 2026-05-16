import { ApiProperty } from '@nestjs/swagger'

export class TrustScoreResponseDto {
  @ApiProperty({ example: 'SQD-1234567890' })
  virtualAccountNumber: string

  @ApiProperty({
    example: 72,
    minimum: 0,
    maximum: 100,
    description:
      'AI-computed trust score based on transaction history and behaviour patterns',
  })
  trustScore: number

  @ApiProperty({
    example: 14,
    description: 'Number of Squad transactions analysed to compute the score',
  })
  transactionCount: number

  @ApiProperty({
    example: '2024-05-16T10:00:00.000Z',
    description: 'ISO 8601 timestamp of score computation',
  })
  computedAt: string
}
