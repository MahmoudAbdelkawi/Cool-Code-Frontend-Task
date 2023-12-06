import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({timestamps: true})
export class TaskEntity  {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    dueDate : Date;

    @Prop({ required: true })
    userId : string;

    @Prop({ required: true , default: false})
    completed: boolean;

    @Prop({ required: true})
    category: string;

    @Prop({ required: true , default: "user"})
    role: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);