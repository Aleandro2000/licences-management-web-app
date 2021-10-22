import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiplomaService } from './diploma.service';
import { CreateDiplomaDto } from './dto/create-diploma.dto';
import { UpdateDiplomaDto } from './dto/update-diploma.dto';

@Controller('diploma')
export class DiplomaController {
  constructor(private readonly diplomaService: DiplomaService) {}

  @Post()
  create(@Body() createDiplomaDto: CreateDiplomaDto) {
    return this.diplomaService.create(createDiplomaDto);
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
  update(@Param('id') id: string, @Body() updateDiplomaDto: UpdateDiplomaDto) {
    return this.diplomaService.update(+id, updateDiplomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diplomaService.remove(+id);
  }
}
