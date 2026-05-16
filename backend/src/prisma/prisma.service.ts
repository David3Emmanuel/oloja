import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly client: InstanceType<typeof PrismaClient>

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    })
    this.client = new PrismaClient({ adapter })
  }

  async onModuleInit() {
    await this.client.$connect()
  }

  get user() {
    return this.client.user
  }
}
