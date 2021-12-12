import { Injectable } from '@nestjs/common'
import { DepartmentDto } from './dto/department.dto'
import { Department } from './entities/department.entity'

@Injectable()
export class DepartmentService {
  async add (departmentDto: DepartmentDto): Promise<any> {
    try {
      let department
      department = await Department.findOne({ teacherId: departmentDto.teacherId })
      if (!department) {
        department = new Department()
        department.teacherId = departmentDto.teacherId
        department.name = departmentDto.name
        await department.save()
        return { status: 200, result: department }
      } else { return { status: 400, message: 'Teacher already exists!' } }
    } catch (err) {
      return { status: 400, message: err }
    }
  }

  async findAll (): Promise<any> {
    try {
      return { status: 200, result: await Department.find({}) }
    } catch (err) {
      return { status: 400, message: err }
    }
  }

  async delete (departmentDto: DepartmentDto): Promise<any> {
    try {
      if (departmentDto.teacherId) {
        await Department.delete({ teacherId: departmentDto.teacherId })
        return { status: 200, message: 'diploma succesfully deleted!' }
      } else { return { status: 400, message: 'Failed to delete diploma!' } }
    } catch (err) {
      return { status: 400, message: err }
    }
  }
}
