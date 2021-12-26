import { Controller, Post, Body, Delete, UsePipes, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';
import { DiplomaService } from './diploma.service';
import { DiplomaDto } from './dto/diploma.dto';

@Controller('api/v1/diploma')
export class DiplomaController {
  constructor(private readonly diplomaService: DiplomaService) { }

  @Post("upload")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async upload(@Body() diplomaDto: DiplomaDto) {
    return await this.diplomaService.upload(diplomaDto);
  }
  
  @Post("grade")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async grade(@Body() diplomaDto: DiplomaDto) {
    return await this.diplomaService.grade(diplomaDto);
  }


  @Get("findall")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.diplomaService.findAll();
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async delete(@Body() diplomaDto: DiplomaDto) {
    return await this.diplomaService.delete(diplomaDto);
  }
}