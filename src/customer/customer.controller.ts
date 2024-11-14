import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/id/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    console.log('Controller');
    const r = await this.customerService.getUserById(id);
    return r;
  }

  @Get('all')
  async getAllUsers() {
    console.log('Controller');
    const r = await this.customerService.getAllUsers();
    return r;
  }
}