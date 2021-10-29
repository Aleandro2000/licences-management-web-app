import { Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  create(departmentDto: DepartmentDto) {
    return 'This action adds a new department';
  }

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
