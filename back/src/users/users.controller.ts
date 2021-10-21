import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDto} from "./dto/user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  register(@Body() userDto: UserDto) {
    return this.usersService.register(userDto);
  }

  @Post("/login")
  findAll(@Body() userDto: UserDto) {
    return this.usersService.login(userDto);
  }
}
