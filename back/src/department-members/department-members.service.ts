import { Injectable } from '@nestjs/common';
import { DepartmentMemberDto } from './dto/department-member.dto';

@Injectable()
export class DepartmentMembersService {
  create(departmentMemberDto: DepartmentMemberDto) {
    return 'This action adds a new departmentMember';
  }

  findAll() {
    return `This action returns all departmentMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departmentMember`;
  }

  update(id: number) {
    return `This action updates a #${id} departmentMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} departmentMember`;
  }
}
