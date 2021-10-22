import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicencesService } from './licences.service';
import { CreateLicenceDto } from './dto/create-licence.dto';
import { UpdateLicenceDto } from './dto/update-licence.dto';

@Controller('licences')
export class LicencesController {
  constructor(private readonly licencesService: LicencesService) {}

  @Post()
  create(@Body() createLicenceDto: CreateLicenceDto) {
    return this.licencesService.create(createLicenceDto);
  }

  @Get()
  findAll() {
    return this.licencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenceDto: UpdateLicenceDto) {
    return this.licencesService.update(+id, updateLicenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licencesService.remove(+id);
  }
}
