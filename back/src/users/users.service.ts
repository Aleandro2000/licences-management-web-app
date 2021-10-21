import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Teacher,Student } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  async register(userDto: UserDto) {
    try {
      let user;
      let { type,email,username,password,birthday } = userDto;
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      switch(type)
      {
        case "student":
          if(!Student.findOne({email: email}))
          {
            user = new Student();
            user.username = username;
            user.email = email;
            user.password = password;
            user.birthday = birthday;
            await Student.save(user);
            return {status: 200, result: user};
          }
          else
            return {status: 400, msg: "User already exists!"};
        case "teacher":
          if(!Teacher.findOne({email: email}))
          {
            user = new Teacher();
            user.username = username;
            user.email = email;
            user.password = password;
            user.birthday = birthday;
            await Teacher.save(user);
            return {status: 200, result: user};
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

  async login(userDto: UserDto) {
    try {
      let user;
      const { type,email,password } = userDto;
      switch(type)
      {
        case "student":
          user = Student.findOne({email: email});
          if(user && bcrypt.compare(password, user.password))
            return {status: 200, result: user};
          else
            return {status: 400, msg: "User not found!"};
        case "teacher":
          user = Teacher.findOne({email: email});
          if(user && bcrypt.compare(password, user.password))
            return {status: 200, result: user};
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
}
