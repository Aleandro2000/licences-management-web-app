import { Injectable } from '@nestjs/common';
import { LicenceDto } from './dto/licence.dto';
import { Licence } from "./entities/licence.entity";
import { createQueryBuilder } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class LicencesService {
  constructor(private readonly jwtService: JwtService) { }

  async upload(licenceDto: LicenceDto): Promise<any> {
    try {
      if (licenceDto.studentId && licenceDto.universityId && licenceDto.title && licenceDto.content) {
        let licence;
        licence = await Licence.find({ studentId: licenceDto.studentId });
        if (licence.length) {
          licence = await Licence.update({ studentId: licenceDto.studentId }, { content: licenceDto.content, title: licenceDto.title, universityId: licenceDto.universityId });
          return { staus: 200, result: licence, message: "Licence uploaded!" };
        }
        else {
          licence = new Licence();
          licence.studentId = licenceDto.studentId;
          licence.universityId = licenceDto.universityId;
          licence.title = licenceDto.title;
          licence.content = licenceDto.content;
          await Licence.save(licence);
          return { staus: 200, result: licence, message: "Licence uploaded!" };
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
      const result = createQueryBuilder('licence', 'l').innerJoinAndSelect('l.student', 's').getMany();
      return { status: 200, result: result };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async find(request: Request): Promise<any> {
    try {
      const data = await this.jwtService.verify(request.cookies.jwt);
      const result = await createQueryBuilder('licence', 'l').innerJoinAndSelect('l.university', 'u.studentId=' + data.user.id).getMany();
      return { status: 200, result: result };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async findById(licenceDto: LicenceDto): Promise<any> {
    try {
      const result = await createQueryBuilder('licence', 'l').innerJoinAndSelect('l.university', 'u.studentId=' + licenceDto.studentId).getMany();
      return { status: 200, result: result };
    }
    catch (err) {
      return { status: 400, message: err };
    }
  }

  async delete(licenceDto: LicenceDto): Promise<any> {
    try {
      if (licenceDto.id) {
        await Licence.delete({ id: licenceDto.id });
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
