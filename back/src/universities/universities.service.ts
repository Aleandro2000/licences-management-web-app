import { Injectable } from '@nestjs/common';
import { UniversityDto } from './dto/university.dto';
import { University } from "./entities/university.entity";

@Injectable()
export class UniversitiesService {
  async findAll(): Promise<any> {
    try {
      return {status: 200, result: await University.find({})};
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async create(universityDto: UniversityDto): Promise<any> {
    try {
      if (universityDto.name && universityDto.studentId)
      {
        let university = await University.findOne({name: universityDto.name});
        if (!university)
        {
          university = new University();
          university.studentId = universityDto.studentId;
          university.name = universityDto.name;
          await University.save(university);
          return {status: 200, result: university};
        }
        else
          return {status: 400, message: "Failed to append university!"};
      }
      else
        return {status: 400, message: "Failed to append university!"};
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async read(universityDto: UniversityDto): Promise<any> {
    try {
      if (universityDto.id)
      {
        const university = await University.findOne({id: universityDto.id});
        if (university)
          return {status: 200, result: university};
        else
          return {status: 400, message: "Failed to read university details!"};
      }
      else
        return {status: 400, message: "Failed to read university details!"};
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async update(universityDto: UniversityDto): Promise<any> {
    try {
      if(universityDto.id)
      {
        await University.update({id: universityDto.id},{name: universityDto.name});
        return {status: 200, message: "University updated successfully!"};
      }
      else
        return {status: 400, message: "Failed to delete university!"};
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async delete(universityDto: UniversityDto): Promise<any> {
    try {
      if(universityDto.id)
      {
        await University.delete({id: universityDto.id});
        return {status: 200, message: "University deleted successfully!"};
      }
      else if(universityDto.name)
      {
        await University.delete({name: universityDto.name});
        return {status: 200, message: "University deleted successfully!"};
      }
      else
        return {status: 400, message: "Failed to delete university!"};
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }
}