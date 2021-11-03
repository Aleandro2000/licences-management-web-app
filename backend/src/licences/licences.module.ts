import { Module } from '@nestjs/common';
import { LicencesService } from './licences.service';
import { LicencesController } from './licences.controller';

@Module({
  controllers: [LicencesController],
  providers: [LicencesService]
})
export class LicencesModule {}
