import { Controller, Post, Body, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DiplomaService } from './diploma.service';
import { DiplomaDto } from './dto/diploma.dto';

@Controller('api/v1/diploma')
export class DiplomaController {
  constructor(private readonly diplomaService: DiplomaService) {}

  @Post("upload")
  @UsePipes(new ValidationPipe({transform: true}))
  async upload(@Body() diplomaDto: DiplomaDto) {
    return await this.diplomaService.upload(diplomaDto);
  }

  @Post("findall")
  @UsePipes(new ValidationPipe({transform: true}))
  async findAll() {
    return await this.diplomaService.findAll();
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({transform: true}))
  async delete(@Body() diplomaDto: DiplomaDto) {
    return await this.diplomaService.delete(diplomaDto);
  }
}