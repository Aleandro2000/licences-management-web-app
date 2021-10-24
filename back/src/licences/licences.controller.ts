import { Controller, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { LicencesService } from './licences.service';
import { LicenceDto } from './dto/licence.dto';

@Controller('api/v1/licence')
export class LicencesController {
  constructor(private readonly licencesService: LicencesService) {}

  @Post("upload")
  @UsePipes(new ValidationPipe({transform: true}))
  async upload(@Body() licenceDto: LicenceDto) {
    return await this.licencesService.upload(licenceDto);
  }

  @Post("findall")
  @UsePipes(new ValidationPipe({transform: true}))
  async findAll() {
    return await this.licencesService.findAll();
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({transform: true}))
  async delete(@Body() licenceDto: LicenceDto) {
    return await this.licencesService.delete(licenceDto);
  }
}
