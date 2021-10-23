import { Controller, Post, Body, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversityDto } from './dto/university.dto';

@Controller('/api/v1/universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post("findall")
  @UsePipes(new ValidationPipe({transform: true}))
  async findAll() {
    return await this.universitiesService.findAll();
  }

  @Post("create")
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.create(universityDto);
  }

  @Post("read")
  @UsePipes(new ValidationPipe({transform: true}))
  async read(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.read(universityDto);
  }

  @Post("update")
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.update(universityDto);
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({transform: true}))
  async delete(@Body() universityDto: UniversityDto) {
    return await this.universitiesService.delete(universityDto);
  }
}
