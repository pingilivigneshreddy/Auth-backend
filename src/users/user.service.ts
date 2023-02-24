import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createuser(createUserDto: UserDto): Promise<User> {
    const createUser = new this.userModel();
    createUser.username = createUserDto.username;
    createUser.password = await bcrypt.hash(createUserDto.password, 10);
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id, createUserDto: UserDto) {
    console.log(id, createUserDto, 'in service update');

    const createUser = new this.userModel();
    // createUser.findOne({ _id: id });

    return this.userModel.findOneAndUpdate({ _id: id }, createUserDto);
  }

  async deleteOne(id: String) {
    console.log(id, 'id');

    return this.userModel.remove({ _id: id }).exec();
  }
}
