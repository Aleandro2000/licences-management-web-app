import { Injectable } from '@nestjs/common';
import { UniversityDto } from './dto/university.dto';
import { University } from "./entities/university.entity";
import { Licence } from "../licences/entities/licence.entity";
import { Diploma } from "../diploma/entities/diploma.entity";

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
      let id;
      if(universityDto.id)
      {
        await University.delete({id: universityDto.id});
        await Diploma.delete({universityId: universityDto.id});
        await Licence.delete({universityId: universityDto.id});
        return {status: 200, message: "University deleted successfully!"};
      }
      else if(universityDto.name)
      {
        id = await University.findOne({name: universityDto.name});
        await University.delete({name: universityDto.name});
        await Diploma.delete({universityId: id});
        await Licence.delete({universityId: id});
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