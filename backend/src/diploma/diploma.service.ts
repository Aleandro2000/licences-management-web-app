import { Injectable } from '@nestjs/common';
import { DiplomaDto } from './dto/diploma.dto';
import { Diploma } from "./entities/diploma.entity";
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class DiplomaService {
  async upload(diplomaDto: DiplomaDto): Promise<any> {
    try {
      if (diplomaDto.studentId && diplomaDto.universityId && diplomaDto.grade) {
        let diploma;
        diploma = await Diploma.find({ studentId: diplomaDto.studentId });
        if (diploma.length) {
          diploma = await Diploma.update({ studentId: diplomaDto.studentId }, { grade: diplomaDto.grade, universityId: diplomaDto.universityId });
          return { staus: 200, message: "Licence graded!" };
        }
        else {
          diploma = new Diploma();
          diploma.studentId = diplomaDto.studentId;
          diploma.universityId = diplomaDto.universityId;
          diploma.grade = diplomaDto.grade;
          await diploma.save(diploma);
          return { staus: 200, message: "Licence graded!" };
        }
      }
      else
        return { status: 400, message: "Failed to upload diploma!" };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await createQueryBuilder('diploma', 'd').innerJoinAndSelect('d.student', 's').innerJoinAndSelect('d.university', 'u').getMany();
      return { status: 200, result: result };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async delete(diplomaDto: DiplomaDto): Promise<any> {
    try {
      await Diploma.delete({ id: diplomaDto.id });
      return { status: 200, message: "Diploma succesfully deleted!" };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }
}