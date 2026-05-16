import { Module } from '@nestjs/common'
import { OpportunitiesService } from './opportunities.service'
import { OpportunitiesController } from './opportunities.controller'
import { AiModule } from '../ai/ai.module'

@Module({
  imports: [AiModule],
  providers: [OpportunitiesService],
  controllers: [OpportunitiesController],
})
export class OpportunitiesModule {}
