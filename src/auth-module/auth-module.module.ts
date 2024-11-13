import { Module } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';
import { AuthModuleController } from './auth-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/customer/entities/User.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthModuleController],
  providers: [AuthModuleService,JwtService],
  exports: [AuthModuleService]
})
export class AuthModule{}
