import { Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/department.dto';
import { Department } from "./entities/department.entity";

@Injectable()
export class DepartmentService {
  async upload(departmentDto: DepartmentDto): Promise<any> {
    
  }

  async findAll(): Promise<any> {
    
  }

  async delete(departmentDto: DepartmentDto): Promise<any> {
  
  }
}
