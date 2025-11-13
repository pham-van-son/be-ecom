import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import * as express from 'express';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  try {
    const dataSource = app.get(DataSource);
    if (dataSource.isInitialized) {
      await dataSource.runMigrations();
      console.log('Migrations ran successfully!');
    }
  } catch (error) {
    console.error('Migration failed:', error.message);
  }

  app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true });

  app.setGlobalPrefix('api/v1');

  app.use(bodyParser.json({ limit: '1000mb' }));
  app.use((bodyParser.urlencoded({ limit: '1000mb', extended: true })));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use('/uploads', express.static(join(__dirname, '..', 'public', 'uploads')));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
