import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/task/schema/task.schema';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports:[ MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  imports: [MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]) ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class UserModule {}
