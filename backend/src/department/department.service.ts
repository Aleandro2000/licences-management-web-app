import { Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/department.dto';
import { Department } from './entities/department.entity';
import { createQueryBuilder } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class DepartmentService {
  constructor(private readonly jwtService: JwtService) { }
  
  async add(request: Request, departmentDto: DepartmentDto): Promise<any> {
    try {
      const data = await this.jwtService.verify(request.cookies.jwt)
      if (data.user.id) {
        let department = await Department.findOne({ teacherId: data.user.id, name: departmentDto.name })
        if (!department) {
          department = new Department()
          department.teacherId = data.user.id
          department.name = departmentDto.name
          await department.save()
          return { status: 200, result: department }
        }
        else
          return { status: 400, message: "Department name may not be duplicated!" }
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
        return { status: 200, message: 'Department succesfully deleted!' }
      } else { return { status: 400, message: 'Failed to delete diploma!' } }
    } catch (err) {
      return { status: 400, message: err }
    }
  }
}
