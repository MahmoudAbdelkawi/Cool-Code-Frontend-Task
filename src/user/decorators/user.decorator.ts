import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { decode } from "jsonwebtoken";

export const UserDecorator = createParamDecorator((data, context:ExecutionContext) => {
    const request  = context.switchToHttp().getRequest();
    // get token from header and decode it
    // return user id
    const token = request?.headers?.authorization?.split(" ")[1];
    
    if(token){
        const user : any = decode(token);
        return user?.id;
    }

    // return request?.user?.id;
});