import { Injectable } from '@nestjs/common';
import { DiplomaDto } from './dto/diploma.dto';
import { Diploma } from "./entities/diploma.entity";

@Injectable()
export class DiplomaService {
  async upload(diplomaDto: DiplomaDto): Promise<any> {
    try{
      if(diplomaDto.studentId&&diplomaDto.universityId&&diplomaDto.grade)
      {
        let diploma;
        diploma = await Diploma.find({studentId: diplomaDto.studentId});
        if(diploma)
        {
          diploma = await Diploma.update({studentId: diplomaDto.studentId},{grade: diplomaDto.grade,universityId: diplomaDto.universityId});
          return {staus: 200, result: diploma};
        }
        else
        {
          diploma = new Diploma();
          diploma.studentId = diplomaDto.studentId;
          diploma.universityId = diplomaDto.universityId;
          diploma.grade = diplomaDto.grade;
          await diploma.save(diploma);
          return {staus: 200, result: diploma};
        }
      }
      else
        return {status: 400, message: "Failed to upload diploma!"};
    }
    catch (err){
      return {status: 400, message: err};
    }
  }

  async findAll(): Promise<any> {
    try{
      return {status: 200, result: await Diploma.find({})};
    }
    catch (err){
      return {status: 400, message: err};
    }
  }

  async delete(diplomaDto: DiplomaDto): Promise<any> {
    try{
      if(diplomaDto.studentId)
      {
        await Diploma.delete({studentId: diplomaDto.studentId});
        return {status: 200, message: "diploma succesfully deleted!"};
      }
      else
        return {status: 400, message: "Failed to delete diploma!"};
    }
    catch (err){
      return {status: 400, message: err};
    }
  }
}