import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity } from './schema/task.schema';
import { Model, ObjectId } from 'mongoose';
import { AssignTaskDTO, CreateTaskDTO } from './dtos/task.dto';

@Injectable()
export class TaskService {
    private readonly tasks: string[] = ["work", "personal", "shopping"];

    constructor(@InjectModel('task') private readonly taskModel:Model<TaskEntity> ) { }

    async createTask(task: CreateTaskDTO, user:string):Promise<TaskEntity>  {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        if (!this.tasks.includes(task.category)) {
            throw new BadRequestException("category not found")
        }
        const taskData = await (await this.taskModel.create({ ...task, userId: user }));
        return taskData
    }

    async getTask(id: ObjectId , user:string):Promise<TaskEntity>  {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        const taskData = await this.taskModel.findOne({$and : [{_id : id} , {userId : user}]})
        if (!taskData) {
            throw new NotFoundException("task not found")
        }
        return taskData
    }

    async getTasks(user:any):Promise<TaskEntity[]>  {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        
        return await this.taskModel.find({})
    }

    async deleteTask(id: ObjectId,user:string):Promise<any> {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        const taskData = await this.taskModel.findOneAndDelete({$and : [{_id : id} , {userId : user}]})
        if (!taskData) {
            throw new NotFoundException("task not found")
        }
        return {message : "task deleted successfully" , taskData}
    }

    async updateTask(id: ObjectId, task: CreateTaskDTO,user:string):Promise<TaskEntity> {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        const taskData = await this.taskModel.findOneAndUpdate({$and : [{_id : id} , {userId : user}]}, task, { new: true })
        if (!taskData) {
            throw new NotFoundException("task not found")
        }
        return taskData
    }

    async markAsCompleted(id: ObjectId,user:string):Promise<TaskEntity> {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        const oldTask = await this.taskModel.findOne({$and : [{_id : id} , {userId : user}]})
        if (!oldTask) {
            throw new NotFoundException("task not found")
        }
        if (oldTask.completed) {
            throw new BadRequestException("task already completed")
        }
        oldTask.completed = true
        await oldTask.save()
        return oldTask
    }

    async assignTaskForOtherUser(id:string,otherUser: AssignTaskDTO, user:string):Promise<TaskEntity> {
        if (!user) {
            throw new BadRequestException("you are not logged in")
        }
        if (!otherUser) {
            throw new BadRequestException("please provide other user id")
        }
        else if (otherUser.otherUser === user) {
            throw new BadRequestException("Task already assigned to you")
        }
        else if (!await this.taskModel.findOne({userId : otherUser.otherUser}) ) {
            throw new NotFoundException("user not found")
        }
        const oldTask = await this.taskModel.findOne({userId : user})
        if (!oldTask) {
            throw new NotFoundException("task not found")
        }
        oldTask.userId = otherUser.otherUser
        await oldTask.save()
        return oldTask
    }
}
