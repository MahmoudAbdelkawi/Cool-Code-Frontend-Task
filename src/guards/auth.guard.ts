import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common" 
import { Reflector } from "@nestjs/core"
import { decode } from "jsonwebtoken"

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly reflector : Reflector){}

	async canActivate(context : ExecutionContext){
        const roles = this.reflector.getAllAndOverride("roles", [
            context.getHandler(),
            context.getClass()
        ])
        if(roles.length){
            const request = context.switchToHttp().getRequest()
            const user : any = await decode(request.headers?.authorization?.split(" ")[1])
            return roles.includes(user?.role)
        }
		return false
	}
}