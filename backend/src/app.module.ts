import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { SquadModule } from './squad/squad.module'
import { UsersModule } from './users/users.module'
import { OpportunitiesModule } from './opportunities/opportunities.module'
import { TrustModule } from './trust/trust.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    SquadModule,
    UsersModule,
    OpportunitiesModule,
    TrustModule,
  ],
})
export class AppModule {}
