import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterationDto } from '../dto/auth.dto';

import { compare, hash } from 'bcryptjs';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { TaskEntity } from 'src/task/schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;
  constructor(@InjectModel('task') private readonly taskModel:Model<TaskEntity> ) {
    this.prisma = new PrismaClient();
  }

  async signUp(signupDto: RegisterationDto) {
    const isFound = await this.prisma.user.findMany({where :{ email: signupDto.email }});
    if (isFound.length) {
      throw new ConflictException('email already exists');
    }
    const hashedPassword = await hash(
      signupDto.password,
      Number(process.env.SALT),
    );


    const user = await this.prisma.user.create({
      data:{
        email: signupDto.email,
        password: hashedPassword,
    }
  });

    const token = sign({ id : user.id , role : user.role }, "This Is Token", { expiresIn: '1h' });

    return { user, token };
  }

  async signIn(signInDto : RegisterationDto) {
    const user = await this.prisma.user.findFirst({where : { email: signInDto.email }});
    if (!user) {
      throw new BadRequestException('Email password is not correct');
    }
    const isMatch  = await compare(signInDto.password , user.password);
    if (isMatch) {
      const token = sign({ id : user.id , role : user.role }, "This Is Token", { expiresIn: '1h' });
      return { user, token };
    }
    else {
      throw new BadRequestException('Email password is not correct');
    }
  }

  async getMe(UserId : string) {
    const user = await this.prisma.user.findFirst({where:{id:UserId}});
    if (!user) {
      throw new UnauthorizedException('you are not logged in')
    }
    const tasks = await this.taskModel.find({userId:UserId});
    return {user , tasks};
  }
}
