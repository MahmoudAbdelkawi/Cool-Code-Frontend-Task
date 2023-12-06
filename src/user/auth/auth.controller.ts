import { Controller , Post , Body , UseInterceptors, Get } from '@nestjs/common';
import { RegisterationDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { CustomInterceptor } from '../interceptors/custom.interceptor';
import { UserDecorator } from '../decorators/user.decorator';

@UseInterceptors(CustomInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}
    
    @Post('/signup')
    signUp(@Body() signupDto: RegisterationDto) {
        return this.authService.signUp(signupDto);
    }

    @Post('/signin')
    signIn(@Body() signInDto: RegisterationDto) {
        return this.authService.signIn(signInDto);
    }

    @Get("/me")
    getMe(@UserDecorator() userId) {
        return this.authService.getMe(userId);
    }
}
