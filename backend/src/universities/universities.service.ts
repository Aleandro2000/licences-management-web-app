import { Injectable } from '@nestjs/common'
import { UniversityDto } from './dto/universities.dto'
import { University } from './entities/universities.entity'
import { createQueryBuilder } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class UniversitiesService {
  constructor(private readonly jwtService: JwtService) { }

  async findAll(): Promise<any> {
    try {
      const result = await createQueryBuilder('university', 'u').innerJoinAndSelect('u.student', 's').getMany()
      return { status: 200, result: result }
    } catch (err) {
      return { status: 400, message: err }
    }
  }

  async create(request: Request, universityDto: UniversityDto): Promise<any> {
    try {
      const data = await this.jwtService.verify(request.cookies.jwt)
      if (universityDto.name && data.user.id) {
        let university = await University.findOne({ studentId: data.user.id, name: universityDto.name })
        if (!university) {
          university = new University()
          university.studentId = data.user.id
          university.name = universityDto.name
          await University.save(university)
          return { status: 200, result: university, message: 'University assigned!' }
        } else { return { status: 400, message: 'Failed to append university!' } }
      } else { return { status: 400, message: 'Failed to get data!' } }
    } catch (err) {
      return { status: 400, message: err }
    }
  }

  async delete(universityDto: UniversityDto): Promise<any> {
    try {
      if (universityDto.id) {
        await University.delete({ id: universityDto.id })
        return { status: 200, message: 'University deleted successfully!' }
      } else if (universityDto.name) {
        await University.delete({ name: universityDto.name })
        return { status: 200, message: 'University deleted successfully!' }
      } else { return { status: 400, message: 'Failed to delete university!' } }
    } catch (err) {
      return { status: 400, message: err }
    }
  }
}
