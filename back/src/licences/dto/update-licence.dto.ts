import { PartialType } from '@nestjs/mapped-types';
import { CreateLicenceDto } from './create-licence.dto';

export class UpdateLicenceDto extends PartialType(CreateLicenceDto) {}
