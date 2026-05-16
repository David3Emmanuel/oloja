import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { SquadModule } from './squad/squad.module'
import { UsersModule } from './users/users.module'
import { OpportunitiesModule } from './opportunities/opportunities.module'
import { TrustModule } from './trust/trust.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SquadModule,
    UsersModule,
    OpportunitiesModule,
    TrustModule,
  ],
})
export class AppModule {}
