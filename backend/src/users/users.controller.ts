import { Controller, Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { OnboardUserDto } from './dto/onboard-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('onboard')
  onboard(@Body() dto: OnboardUserDto) {
    return this.usersService.onboard(dto)
  }
}
