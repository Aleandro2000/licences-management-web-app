import { PartialType } from '@nestjs/mapped-types';
import { CreateDiplomaDto } from './create-diploma.dto';

export class UpdateDiplomaDto extends PartialType(CreateDiplomaDto) {}
