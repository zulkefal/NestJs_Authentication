import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ValidateCustomerMiddleware } from 'src/middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from 'src/middlewares/validate-customer-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCustomerMiddleware).forRoutes({
      path: 'customer/id/:id',
      method: RequestMethod.GET,
    });
    consumer.apply(ValidateCustomerAccountMiddleware).forRoutes({
      path: 'customer',
      method: RequestMethod.POST,
    });
  }
}