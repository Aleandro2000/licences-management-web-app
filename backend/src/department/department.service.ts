import { Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/department.dto';
import { Department } from './entities/department.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class DepartmentService {
  async add(departmentDto: DepartmentDto): Promise<any> {
    try {
      if (departmentDto.name) {
        const department = new Department()
        department.teacherId = departmentDto.teacherId
        department.name = departmentDto.name
        await department.save()
        return { status: 200, result: department }
      }
      else
        return { status: 400, message: "Department name may not be empty!" }
    } catch (err) {
      return { status: 400, message: err }
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await createQueryBuilder('department', 'd').innerJoinAndSelect('d.teacher', 't').getMany();
      return { status: 200, result: result }
    } catch (err) {
      return { status: 400, message: err }
    }
  }

  async delete(departmentDto: DepartmentDto): Promise<any> {
    try {
      if (departmentDto.id) {
        await Department.delete({ id: departmentDto.id })
        return { status: 200, message: 'Diploma succesfully deleted!' }
      } else { return { status: 400, message: 'Failed to delete diploma!' } }
    } catch (err) {
      return { status: 400, message: err }
    }
  }
}
