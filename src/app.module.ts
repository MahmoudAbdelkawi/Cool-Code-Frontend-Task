import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './task/task.module';
import { TaskController } from './task/task.controller';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/mydb'),UserModule, HomeModule ],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
