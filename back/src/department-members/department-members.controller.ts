import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DepartmentMembersService } from './department-members.service';
import { DepartmentMemberDto } from './dto/department-member.dto';

@Controller('department-members')
export class DepartmentMembersController {
  constructor(private readonly departmentMembersService: DepartmentMembersService) {}

  @Post()
  create(@Body() departmentMemberDto: DepartmentMemberDto) {
    return this.departmentMembersService.create(departmentMemberDto);
  }

  @Get()
  findAll() {
    return this.departmentMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentMembersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentMembersService.remove(+id);
  }
}
