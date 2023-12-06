import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSchema } from './schema/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]) ],
    // MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]) ],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService]
})
export class HomeModule {}
