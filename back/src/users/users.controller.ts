import { Controller, Post, Body, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto,TeacherDto } from "./dto/user.dto";

@Controller("api/v1/auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("addstudent")
  @UsePipes(new ValidationPipe({transform: true}))
  async addStudent(@Body() teacherDto: TeacherDto) {
    return await this.usersService.addStudent(teacherDto);
  }

  @Post("register")
  @UsePipes(new ValidationPipe({transform: true}))
  async register(@Body() userDto: UserDto) {
    return await this.usersService.register(userDto);
  }

  @Post("login")
  @UsePipes(new ValidationPipe({transform: true}))
  async login(@Body() userDto: UserDto) {
    return await this.usersService.login(userDto);
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({transform: true}))
  async delete(@Body() userDto: UserDto) {
    return await this.usersService.delete(userDto);
  }
}