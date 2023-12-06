import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { UserDecorator } from '../user/decorators/user.decorator';
import { AssignTaskDTO, CreateTaskDTO } from '../task/dtos/task.dto';
import { TaskEntity } from '../task/schema/task.schema';
import { ObjectId } from 'mongoose';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    // @UseGuards(AuthGuard)
    @Post()
    createTask(@Body() task:CreateTaskDTO , @UserDecorator() user :string):Promise<TaskEntity>  {
        return this.taskService.createTask(task, user);
    }

    @Get(":id")
    getTask(@Param('id') id:ObjectId , @UserDecorator() user :string):Promise<TaskEntity> {
        return this.taskService.getTask(id, user);
    }

    @Get()
    getTasks(@UserDecorator() user :string):Promise<TaskEntity[]> {
        return this.taskService.getTasks(user);
    }

    @Delete(":id")
    deleteTask(@Param('id') id:ObjectId , @UserDecorator() user :string):Promise<any> {
        return this.taskService.deleteTask(id , user);
    }

    @Put("/update/:id")
    updateTask(@Param('id') id:ObjectId, @Body() task: CreateTaskDTO , @UserDecorator() user :string):Promise<TaskEntity> {
        return this.taskService.updateTask(id, task, user);
    }

    @Patch("/MarkAsRead/:id")
    updateTaskPartially(@Param('id') id:ObjectId, @UserDecorator() user :string):Promise<TaskEntity> {
        return this.taskService.markAsCompleted(id,  user);
    }

    @Patch("/assign/:id")
    assignTask(@Param('id') taskId:string,@Body() otherUser: AssignTaskDTO , @UserDecorator() user :string):Promise<TaskEntity> {
        return this.taskService.assignTaskForOtherUser(taskId, otherUser,  user);
    }

}
