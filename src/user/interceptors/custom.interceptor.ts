// custom interceptor
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { User } from '@prisma/client';
import { TokenExpiredError, decode } from 'jsonwebtoken';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, // * Context of the request (if you need some informations about the request)
    handler: CallHandler, // * the endpoint that will be called (the response)
  ) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (token) {
      try {
        request.user = decode(token);
      } catch (error) {
        throw new TokenExpiredError('jwt expired', new Date());
      }
    }

    console.log('THIS IS INTERCEPTING THE REQUEST');

    return handler.handle().pipe(
      map((data) => {
        let response = data;
        if (data.user) {
          const user  = data.user;
          delete user.password;
          response = { ...data, user};
        }
        else{
          delete response.password;
        }
        console.log('THIS IS INTERCEPTING THE RESPONSE');
        return data;
      }),
    );
  }
}
