import { Injectable } from '@nestjs/common';
import { UserDto,TeacherDto } from './dto/user.dto';
import { Student } from "./entities/student.entity";
import { Teacher } from "./entities/teacher.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async addStudent(teacherDto: TeacherDto): Promise<any> {
    try {
      await Student.update({id: teacherDto.studentId},{teacherId: teacherDto.teacherId});
      return {status: 200, message: "Teacher assigned!"};
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async register(userDto: UserDto): Promise<any> {
    try {
      let user;
      switch (userDto.type)
      {
        case "student":
          user = await Student.findOne({email: userDto.email});
          if (!user && userDto.username)
          {
            user = new Student();
            user.username = userDto.username;
            user.email = userDto.email;
            user.password = await bcrypt.hash(userDto.password, await bcrypt.genSalt());
            await Student.save(user);
            return {status: 200, result: await this.jwtService.sign({user})};
          }
          else if(!userDto.username)
            return {status: 400, message: "Username may not be empty!"};
          else
            return {status: 400, message: "User already exists!"};
        case "teacher":
          user = await Teacher.findOne({email: userDto.email});
          if (!user && userDto.username)
          {
            user = new Teacher();
            user.username = userDto.username;
            user.email = userDto.email;
            user.password = await bcrypt.hash(userDto.password, await bcrypt.genSalt());
            await Teacher.save(user);
            return {status: 200, result: await this.jwtService.sign({user})};
          }
          else if(!userDto.username)
            return {status: 400, message: "Username may not be empty!"};
          else
            return {status: 400, message: "User already exists!"};
        default:
          return {status: 400, message: "Failed to create user!"};
      }
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async login(userDto: UserDto): Promise<any> {
    try {
      let user;
      switch (userDto.type)
      {
        case "student":
          user = await Student.findOne({email: userDto.email});
          if (user && bcrypt.compare(userDto.password, user.password))
            return {status: 200, result: await this.jwtService.sign(user)};
          else
            return {status: 400, message: "User not found!"};
        case "teacher":
          user = await Teacher.findOne({email: userDto.email});
          if (user && bcrypt.compare(userDto.password, user.password))
            return {status: 200, result: await this.jwtService.sign(user)};
          else
            return {status: 400, message: "User not found!"};
        default:
          return {status: 400, message: "Failed to login as user!"};
      }
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }

  async delete(userDto: UserDto): Promise<any> {
    try {
      switch (userDto.type)
      {
        case "student":
          await Student.delete({id: userDto.id});
          return {status: 200, message: "Successfully deleted!"};
        case "teacher":
          await Teacher.delete({id: userDto.id});
          return {status: 200, message: "Successfully deleted!"};
        default:
          return {status: 400, message: "Deleting failed!"};
      }
    }
    catch (err) {
      return {status: 400, message: err};
    }
  }
}