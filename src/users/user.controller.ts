import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';
import { query } from 'express';
import { UserDto } from './user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  createUser(@Body() userdto: UserDto) {
    return this.userService.createuser(userdto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userdto: UserDto) {
    return this.userService.update(id, userdto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    console.log(id, 'id in controller');

    return this.userService.deleteOne(id);
  }
}
