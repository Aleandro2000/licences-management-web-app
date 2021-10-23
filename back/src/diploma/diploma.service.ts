import { Injectable } from '@nestjs/common';
import { DiplomaDto } from './dto/diploma.dto';

@Injectable()
export class DiplomaService {
  create(diplomaDto: DiplomaDto) {
    return 'This action adds a new diploma';
  }

  findAll() {
    return `This action returns all diploma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diploma`;
  }

  update(id: number) {
    return `This action updates a #${id} diploma`;
  }

  remove(id: number) {
    return `This action removes a #${id} diploma`;
  }
}
