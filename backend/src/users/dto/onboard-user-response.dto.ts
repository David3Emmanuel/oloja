import { ApiProperty } from '@nestjs/swagger'

export class OnboardUserResponseDto {
  @ApiProperty({ example: 'USR-1684156800000' })
  userId: string

  @ApiProperty({ example: 'Amara' })
  firstName: string

  @ApiProperty({ example: 'Okafor' })
  lastName: string

  @ApiProperty({ example: 'amara@example.com', required: false })
  email?: string

  @ApiProperty({ example: '08012345678' })
  phone: string

  @ApiProperty({ enum: ['find_jobs', 'hire_services'], required: false })
  role?: string

  @ApiProperty({ example: ['plumbing', 'tiling'], type: [String] })
  skills: string[]

  @ApiProperty({ example: ['English', 'Yoruba'], type: [String] })
  languages: string[]

  @ApiProperty({ example: 'Lagos' })
  location: string

  @ApiProperty({
    enum: ['beginner', 'intermediate', 'expert'],
    required: false,
  })
  experience?: string

  @ApiProperty({
    description: 'Virtual account details returned by Squad payment provider',
    example: {
      virtual_account_number: 'SQD-1234567890',
      bank: 'Wema Bank',
      account_name: 'Amara Okafor',
    },
  })
  virtualAccount: Record<string, unknown>

  @ApiProperty({
    example: 0,
    description: 'Initial trust score; increases with verified activity',
  })
  trustScore: number

  @ApiProperty({ example: '2024-05-16T10:00:00.000Z' })
  createdAt: string
}
