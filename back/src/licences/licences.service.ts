import { Injectable } from '@nestjs/common';
import { LicenceDto } from './dto/licence.dto';
import { Licence } from "./entities/licence.entity";

@Injectable()
export class LicencesService {
  async upload(licenceDto: LicenceDto): Promise<any> {
    try{
      if(licenceDto.studentId&&licenceDto.universityId&&licenceDto.file)
      {
        let licence;
        licence = await Licence.find({studentId: licenceDto.studentId});
        if(licence)
        {
          licence = await Licence.update({studentId: licenceDto.studentId},{file: licenceDto.file,universityId: licenceDto.universityId});
          return {staus: 200, result: licence};
        }
        else
        {
          licence = new Licence();
          licence.studentId = licenceDto.studentId;
          licence.universityId = licenceDto.universityId;
          licence.file = licenceDto.file;
          await Licence.save(licence);
          return {staus: 200, result: licence};
        }
      }
      else
        return {status: 400, message: "Failed to upload licence!"};
    }
    catch (err){
      return {status: 400, message: err};
    }
  }

  async findAll(): Promise<any> {
    try{
      return {status: 200, result: await Licence.find({})};
    }
    catch (err){
      return {status: 400, message: err};
    }
  }

  async delete(licenceDto: LicenceDto): Promise<any> {
    try{
      if(licenceDto.studentId)
      {
        await Licence.delete({studentId: licenceDto.studentId});
        return {status: 200, message: "Licence succesfully deleted!"};
      }
      else
        return {status: 400, message: "Failed to delete licence!"};
    }
    catch (err){
      return {status: 400, message: err};
    }
  }
}
