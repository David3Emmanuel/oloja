import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TrustService } from './trust.service'
import { TrustController } from './trust.controller'
import { SquadModule } from '../squad/squad.module'

@Module({
  imports: [HttpModule, SquadModule],
  providers: [TrustService],
  controllers: [TrustController],
})
export class TrustModule {}
