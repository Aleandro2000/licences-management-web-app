import { Injectable } from '@nestjs/common';
import { CreateLicenceDto } from './dto/create-licence.dto';
import { UpdateLicenceDto } from './dto/update-licence.dto';

@Injectable()
export class LicencesService {
  create(createLicenceDto: CreateLicenceDto) {
    return 'This action adds a new licence';
  }

  findAll() {
    return `This action returns all licences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} licence`;
  }

  update(id: number, updateLicenceDto: UpdateLicenceDto) {
    return `This action updates a #${id} licence`;
  }

  remove(id: number) {
    return `This action removes a #${id} licence`;
  }
}
