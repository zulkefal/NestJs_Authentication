import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from './exceptions/UsertNotFound.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  public async getUserById(pId: number) {
    const rzlt = await this.userRepository.findOne({ where: { id: pId } });
    if (!rzlt) {
      throw new UserNotFoundException('User not Found in the system', 202);
    }
    return rzlt;
  }

  public async getAllUsers() {
    const rzlt = await this.userRepository.find();
    if (!rzlt || rzlt.length === 0) {
      throw new UserNotFoundException('No Users found in the system', 202);
    }
    return rzlt;
  }
}