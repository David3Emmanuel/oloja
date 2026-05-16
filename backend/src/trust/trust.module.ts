import { Module } from '@nestjs/common'
import { TrustService } from './trust.service'
import { TrustController } from './trust.controller'
import { SquadModule } from '../squad/squad.module'
import { AiModule } from '../ai/ai.module'

@Module({
  imports: [SquadModule, AiModule],
  providers: [TrustService],
  controllers: [TrustController],
})
export class TrustModule {}
