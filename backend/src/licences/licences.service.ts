import { Injectable } from '@nestjs/common';
import { LicenceDto } from './dto/licence.dto';
import { Licence } from "./entities/licence.entity";
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class LicencesService {
  async upload(licenceDto: LicenceDto): Promise<any> {
    try {
      if (licenceDto.studentId && licenceDto.universityId && licenceDto.title && licenceDto.content) {
        let licence;
        licence = await Licence.find({ studentId: licenceDto.studentId });
        if (licence.length) {
          licence = await Licence.update({ studentId: licenceDto.studentId }, { content: licenceDto.content, title: licenceDto.title, universityId: licenceDto.universityId });
          return { staus: 200, result: licence };
        }
        else {
          licence = new Licence();
          licence.studentId = licenceDto.studentId;
          licence.universityId = licenceDto.universityId;
          licence.title = licenceDto.title;
          licence.content = licenceDto.content;
          await Licence.save(licence);
          return { staus: 200, result: licence };
        }
      }
      else
        return { status: 400, message: "Failed to upload licence!" };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = createQueryBuilder('licence', 'l').innerJoin('l.student', 's');
      return { status: 200, result: result };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async delete(licenceDto: LicenceDto): Promise<any> {
    try {
      if (licenceDto.studentId) {
        await Licence.delete({ studentId: licenceDto.studentId });
        return { status: 200, message: "Licence succesfully deleted!" };
      }
      else
        return { status: 400, message: "Failed to delete licence!" };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }
}
