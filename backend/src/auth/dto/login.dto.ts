import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    example: '08012345678',
    description: 'Phone number or email address',
  })
  @IsString()
  identifier: string

  @ApiProperty({ example: 'secret123' })
  @IsString()
  password: string
}
