import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { OnboardUserDto } from './dto/onboard-user.dto'
import { OnboardUserResponseDto } from './dto/onboard-user-response.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('onboard')
  @ApiOperation({ summary: 'Onboard a new worker or employer' })
  @ApiBody({ type: OnboardUserDto })
  @ApiResponse({
    status: 201,
    type: OnboardUserResponseDto,
    description: 'User created and virtual account provisioned',
  })
  @ApiResponse({
    status: 400,
    description:
      'Validation failed — missing required fields or invalid values',
  })
  @ApiResponse({
    status: 500,
    description: 'Squad payment API error or missing environment variables',
  })
  onboard(@Body() dto: OnboardUserDto) {
    return this.usersService.onboard(dto)
  }
}
