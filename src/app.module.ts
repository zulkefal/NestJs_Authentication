import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './customer/entities/User.entity';
import { AuthModule } from './auth-module/auth-module.module';

@Module({
  imports: [CustomerModule,AuthModule,
    
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:"root",
      password:"admin",
      database:"nestjs_sql_tutorial",
      synchronize:true,
      entities:[User]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
