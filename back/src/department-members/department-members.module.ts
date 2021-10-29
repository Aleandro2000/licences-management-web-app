import { Module } from '@nestjs/common';
import { DepartmentMembersService } from './department-members.service';
import { DepartmentMembersController } from './department-members.controller';

@Module({
  controllers: [DepartmentMembersController],
  providers: [DepartmentMembersService]
})
export class DepartmentMembersModule {}
