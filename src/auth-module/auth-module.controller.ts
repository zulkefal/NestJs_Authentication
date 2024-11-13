import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('auth')
export class AuthModuleController {
  constructor(private readonly authModuleService: AuthModuleService) {
   
  }
  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto:CreateUserDto){
    const rzlt = this.authModuleService.createUser(createUserDto);
    return rzlt;
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto:LoginUserDto){
    const rzlt = this.authModuleService.login(loginUserDto);
    return rzlt;
  }
}
