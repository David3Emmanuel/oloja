import { ApiProperty } from '@nestjs/swagger'

export class OpportunityDto {
  @ApiProperty({ example: 'opp-001' })
  id: string

  @ApiProperty({ example: 'Experienced Plumber Needed' })
  title: string

  @ApiProperty({ example: 'Trades & Construction' })
  category: string

  @ApiProperty({ example: ['plumbing', 'pipefitting'], type: [String] })
  skills: string[]

  @ApiProperty({ example: 'Lagos Island' })
  location: string

  @ApiProperty({ example: 'English' })
  language: string

  @ApiProperty({ example: 15000, description: 'Pay amount in NGN' })
  pay: number

  @ApiProperty({
    example: 'per_job',
    enum: ['per_hour', 'per_day', 'per_job', 'monthly'],
  })
  payFrequency: string

  @ApiProperty({
    example: '3km',
    description: 'Distance from the specified location',
  })
  distance: string

  @ApiProperty({ example: '2 days', description: 'Expected job duration' })
  duration: string

  @ApiProperty({ example: 'BuildRight Ltd' })
  postedBy: string
}

export class OpportunityMatchResponseDto {
  @ApiProperty({
    type: [OpportunityDto],
    description: 'Ranked list of matched opportunities',
  })
  matches: OpportunityDto[]

  @ApiProperty({
    example: true,
    required: false,
    description:
      'Present and true when the AI matching service was unreachable; matches are seed data fallbacks',
  })
  fallback?: boolean
}
