import { Test, TestingModule } from '@nestjs/testing';
import { LicencesService } from './licences.service';

describe('LicencesService', () => {
  let service: LicencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicencesService],
    }).compile();

    service = module.get<LicencesService>(LicencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
