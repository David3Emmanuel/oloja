import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { OpportunitiesService } from './opportunities.service'
import { OpportunitiesController } from './opportunities.controller'

@Module({
  imports: [HttpModule],
  providers: [OpportunitiesService],
  controllers: [OpportunitiesController],
})
export class OpportunitiesModule {}
