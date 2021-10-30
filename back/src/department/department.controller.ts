import { Controller, Post, Get, Body, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';

@Controller('api/v1/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post("add")
  @UsePipes(new ValidationPipe({transform: true}))
  @UseGuards(JwtAuthGuard)
  async add(@Body() departmentDto: DepartmentDto) {
    return await this.departmentService.add(departmentDto);
  }

  @Get("findall")
  @UsePipes(new ValidationPipe({transform: true}))
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.departmentService.findAll();
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({transform: true}))
  @UseGuards(JwtAuthGuard)
  async delete(@Body() departmentDto: DepartmentDto) {
    return await this.departmentService.delete(departmentDto);
  }
}