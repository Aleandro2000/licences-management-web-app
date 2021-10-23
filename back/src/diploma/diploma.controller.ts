import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiplomaService } from './diploma.service';
import { DiplomaDto } from './dto/diploma.dto';

@Controller('diploma')
export class DiplomaController {
  constructor(private readonly diplomaService: DiplomaService) {}

  @Post()
  create(@Body() diplomaDto: DiplomaDto) {
    return this.diplomaService.create(diplomaDto);
  }

  @Get()
  findAll() {
    return this.diplomaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diplomaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.diplomaService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diplomaService.remove(+id);
  }
}
