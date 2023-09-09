import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { FilterQuery } from 'mongoose';

import { UserRepository } from '@/modules/user/user.repository';
import { CreateUserDto } from '@/modules/user/user.dto';
import { UserDocument } from '@/modules/user/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public find() {
    return this.userRepository.find({});
  }

  public findOne(query: FilterQuery<UserDocument>) {
    return this.userRepository.findOne(query);
  }

  public async create(body: CreateUserDto) {
    const salt = await genSalt(10);
    return this.userRepository.create({
      ...body,
      password: await hash(body.password, salt)
    });
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const { password: userPassword, ...rest } = user;
    const isMatch = await compare(password, userPassword || '');
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return rest;
  }

  public async getUser(filterQuery: FilterQuery<UserDocument>) {
    const user = await this.userRepository.findOne(filterQuery);

    if (!user) {
      return user;
    }

    return {
      email: user.email,
      _id: user._id
    };
  }
}
