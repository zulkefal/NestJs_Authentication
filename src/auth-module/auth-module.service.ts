import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserNotFoundException } from 'src/customer/exceptions/UsertNotFound.exception';
import { LoginUserDto } from './dto/LoginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/customer/entities/User.entity';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();



@Injectable()
export class AuthModuleService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>,
    private readonly jwtService:JwtService) {}

    public async createUser(@Body() createUserDto:CreateUserDto){
        const emailFound = await this.userRepository.findOne({where:{email:createUserDto.email}});
        if(emailFound)
        {
            return new UserNotFoundException("Email already exists",202);
        }
        const salRounds=10
        const platinTextPW = '%sadf1234(*)&^%$#@!';
        const hashedPW = await bcrypt.hash(platinTextPW,salRounds);
        createUserDto.password= hashedPW;
        const rezlt = await this.userRepository.save(createUserDto);
        return rezlt;
    
      }
    
      public async login(@Body() loginUserDto:LoginUserDto){
        const findUser = await this.userRepository.findOne({where:{username:loginUserDto.username}});
        if(!findUser)
        {
            return new UserNotFoundException("User not found",202);
        }
        const matchPassword = await bcrypt.compare(loginUserDto.password,findUser.password);
        if(!matchPassword)
        {
            return new UserNotFoundException("Password not matched",202);
        }
        const payload = {sub:findUser.id, username:findUser.username};
        console.log("payload",payload);
        const token = await this.jwtService.signAsync(payload);
        return token;
      }
    
}
