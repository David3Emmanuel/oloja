import { ApiProperty } from '@nestjs/swagger'

class LoginUserDto {
  @ApiProperty({ example: 'USR-1684156800000' })
  id: string

  @ApiProperty({ example: 'Amara' })
  firstName: string

  @ApiProperty({ example: 'Okafor' })
  lastName: string

  @ApiProperty({ example: 'amara@example.com', required: false })
  email?: string | null

  @ApiProperty({ example: '08012345678' })
  phone: string

  @ApiProperty({ enum: ['find_jobs', 'hire_services'], required: false })
  role?: string | null

  @ApiProperty({ example: 'Lagos' })
  location: string

  @ApiProperty({ example: 0 })
  trustScore: number
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string

  @ApiProperty({ type: LoginUserDto })
  user: LoginUserDto
}
