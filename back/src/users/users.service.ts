import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Teacher,Student } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async register(userDto: UserDto): Promise<any> {
    try {
      let user;
      switch (userDto.type)
      {
        case "student":
          user = await Student.findOne({email: userDto.email});
          if (!user)
          {
            user = new Student();
            user.username = userDto.username;
            user.email = userDto.email;
            user.password = await bcrypt.hash(userDto.password, await bcrypt.genSalt());
            await Student.save(user);
            return {status: 200, result: await this.jwtService.sign({user})};
          }
          else
            return {status: 400, msg: "User already exists!"};
        case "teacher":
          user = await Teacher.findOne({email: userDto.email});
          if (!user)
          {
            user = new Teacher();
            user.username = userDto.username;
            user.email = userDto.email;
            user.password = await bcrypt.hash(userDto.password, await bcrypt.genSalt());
            await Teacher.save(user);
            return {status: 200, result: await this.jwtService.sign({user})};
          }
          else
            return {status: 400, msg: "User already exists!"};
        default:
          return {status: 400, msg: "Failed to create user!"};
      }
    }
    catch (err) {
      return {status: 400, msg: err};
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
            return {status: 400, msg: "User not found!"};
        case "teacher":
          user = await Teacher.findOne({email: userDto.email});
          if (user && bcrypt.compare(userDto.password, user.password))
            return {status: 200, result: await this.jwtService.sign(user)};
          else
            return {status: 400, msg: "User not found!"};
        default:
          return {status: 400, msg: "Failed to login as user!"};
      }
    }
    catch (err) {
      return {status: 400, msg: err};
    }
  }

  async delete(userDto: UserDto): Promise<any> {
    try {
      switch (userDto.type)
      {
        case "student":
          await Student.delete({id: userDto.id});
          return {status: 200, msg: "Successfully deleted!"};
        case "teacher":
          await Teacher.delete({id: userDto.id});
          return {status: 200, msg: "Successfully deleted!"};
        default:
          return {status: 400, msg: "Deleting failed!"};
      }
    }
    catch (err) {
      return {status: 400, msg: err};
    }
  }
}
