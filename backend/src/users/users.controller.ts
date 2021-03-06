import { Controller, Post, Body, Delete, ValidationPipe, UsePipes, UseGuards, Res, Req, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto, TeacherDto } from './dto/user.dto'
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard'
import { Request, Response } from 'express'

@Controller('api/v1/auth')
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @Get('getuser')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async getUser (@Req() request: Request) {
    return await this.usersService.getUser(request)
  }
  
  @Get('findall')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async findAll () {
    return await this.usersService.findAll()
  }

  @Post('addstudent')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async addStudent (@Body() userDto: UserDto, @Req() request: Request) {
    return await this.usersService.addStudent(userDto, request)
  }
  
  @Post('removestudent')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async removeStudent (@Body() userDto: UserDto, @Req() request: Request) {
    return await this.usersService.removeStudent(userDto, request)
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register (@Body() userDto: UserDto) {
    return await this.usersService.register(userDto)
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login (@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    return await this.usersService.login(userDto, response)
  }

  @Delete('delete')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async delete (@Req() request: Request) {
    return await this.usersService.delete(request)
  }

  @Delete('deletestudentbyid')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async deleteStudentById (@Body() userDto: UserDto) {
    return await this.usersService.deleteStudentById(userDto)
  }
}
