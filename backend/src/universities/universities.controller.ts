import { Controller, Post, Body, Delete, UsePipes, ValidationPipe, UseGuards, Get, Req } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversityDto } from './dto/universities.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';
import { Request } from 'express';

@Controller('/api/v1/universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) { }

  @Get("findall")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.universitiesService.findAll();
  }

  @Post("create")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async create(@Req() request: Request, @Body() universityDto: UniversityDto) {
    return await this.universitiesService.create(request, universityDto);
  }

  @Post("read")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async read(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.read(universityDto);
  }

  @Post("update")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.update(universityDto);
  }

  @Delete("delete")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.delete(universityDto);
  }
}
