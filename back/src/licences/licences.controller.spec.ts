import { Test, TestingModule } from '@nestjs/testing';
import { LicencesController } from './licences.controller';
import { LicencesService } from './licences.service';

describe('LicencesController', () => {
  let controller: LicencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicencesController],
      providers: [LicencesService],
    }).compile();

    controller = module.get<LicencesController>(LicencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
