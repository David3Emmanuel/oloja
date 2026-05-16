import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { SquadService } from './squad.service'

@ApiTags('Wallet')
@Controller('wallet')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Get('balance/:accountNumber')
  @ApiOperation({ summary: 'Get virtual account balance' })
  @ApiParam({
    name: 'accountNumber',
    description: 'Virtual account number returned from onboarding',
    example: '0123456789',
  })
  @ApiResponse({ status: 200, description: 'Account balance from Squad' })
  getBalance(@Param('accountNumber') accountNumber: string) {
    return this.squadService.getVirtualAccountBalance(accountNumber)
  }
}
