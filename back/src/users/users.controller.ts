import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDto} from "./dto/user.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() userDto: UserDto) {
    return await this.usersService.register(userDto);
  }

  @Post("login")
  async findAll(@Body() userDto: UserDto) {
    return await this.usersService.login(userDto);
  }
}