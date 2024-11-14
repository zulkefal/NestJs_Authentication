import { Module } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';
import { AuthModuleController } from './auth-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/customer/entities/User.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthModuleController],
  providers: [
    AuthModuleService,
    JwtService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthModuleService,
    },
    {
      provide: 'CUSTOMER_SERVICE',
      useClass: CustomerService,
    },
  ],
  exports: [AuthModuleService],
})
export class AuthModule {}
