import { Module } from '@nestjs/common'
import { OpportunitiesService } from './opportunities.service'
import { OpportunitiesController } from './opportunities.controller'
import { AiModule } from '../ai/ai.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [AiModule, UsersModule],
  providers: [OpportunitiesService],
  controllers: [OpportunitiesController],
})
export class OpportunitiesModule {}
