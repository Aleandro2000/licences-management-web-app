import { Test, TestingModule } from '@nestjs/testing';
import { DiplomaService } from './diploma.service';

describe('DiplomaService', () => {
  let service: DiplomaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiplomaService],
    }).compile();

    service = module.get<DiplomaService>(DiplomaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
