import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist : true ,
    forbidNonWhitelisted : true ,
     transform : true , // run the class-transformer before the attributes in DTO
     transformOptions : {enableImplicitConversion : true}  // run the class befos in DTO 
   }));
   // add cors
    app.enableCors();
  await app.listen(3000);
}
bootstrap();
