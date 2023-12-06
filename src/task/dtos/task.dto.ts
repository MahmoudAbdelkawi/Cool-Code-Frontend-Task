import { IsNotEmpty, Length } from "class-validator";

export class CreateTaskDTO{
    @IsNotEmpty()
    @Length(3, 20)
    title: string;

    @IsNotEmpty()
    @Length(3, 20)
    description: string;

    @IsNotEmpty()
    dueDate : Date;

    @IsNotEmpty()
    category: string;

}

export class AssignTaskDTO{
    @IsNotEmpty()
    otherUser : string;
}