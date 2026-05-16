import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Oloja API')
    .setDescription('Backend for Oloja — digital identity and gig matching for informal workers')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)

  await app.listen(process.env.PORT ?? 3001)
  console.log(`Oloja backend running on port ${process.env.PORT ?? 3001}`)
  console.log(`Swagger UI: http://localhost:${process.env.PORT ?? 3001}/docs`)
}
void bootstrap()
