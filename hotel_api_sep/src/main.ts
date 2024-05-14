import { NestFactory } from '@nestjs/core';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    UserModule,
    RoomModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hotel rooms API')
    .setDescription('Hotel rooms API description')
    .setVersion('2.0')
    .addTag('Hotel rooms')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
