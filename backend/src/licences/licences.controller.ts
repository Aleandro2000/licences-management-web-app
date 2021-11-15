import { Controller, Post, Body, Delete, UsePipes, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { LicencesService } from './licences.service';
import { LicenceDto } from './dto/licence.dto';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';

@Controller('api/v1/licence')
export class LicencesController {
  constructor(private readonly licencesService: LicencesService) { }

  @Post("upload")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async upload(@Body() licenceDto: LicenceDto) {
    return await this.licencesService.upload(licenceDto);
  }

  @Get("findall")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.licencesService.findAll();
  }

  @Delete("delete")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  async delete(@Body() licenceDto: LicenceDto) {
    return await this.licencesService.delete(licenceDto);
  }
}