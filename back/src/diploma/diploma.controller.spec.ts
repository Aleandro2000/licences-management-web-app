import { Test, TestingModule } from '@nestjs/testing';
import { DiplomaController } from './diploma.controller';
import { DiplomaService } from './diploma.service';

describe('DiplomaController', () => {
  let controller: DiplomaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiplomaController],
      providers: [DiplomaService],
    }).compile();

    controller = module.get<DiplomaController>(DiplomaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
