import { Controller, Post, Body, Delete, ValidationPipe, UsePipes, UseGuards, Res, Req, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, TeacherDto } from "./dto/user.dto";
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';
import { Request, response, Response } from 'express';
import { getCustomRepository } from 'typeorm';

@Controller("api/v1/auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  async getUser(@Param('id') id: Number) {
    return await this.usersService.getUser(id);
  }

  @Post("addstudent")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async addStudent(@Body() teacherDto: TeacherDto) {
    return await this.usersService.addStudent(teacherDto);
  }

  @Post("register")
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() userDto: UserDto) {
    return await this.usersService.register(userDto);
  }

  @Post("login")
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    return await this.usersService.login(userDto, response);
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async delete(@Req() request: Request, @Res() response: Response) {
    return await this.usersService.delete(request, response);
  }
}