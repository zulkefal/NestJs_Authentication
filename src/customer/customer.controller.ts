import {  Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/id/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    const r = this.customerService.getUserById(id);
    return r;
  }

  @Get('all')
  getAllUsers() {
    const r = this.customerService.getAllUsers();
    return r;
  }

  
}