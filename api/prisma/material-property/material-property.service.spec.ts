import { Test, TestingModule } from '@nestjs/testing';
import { MaterialPropertyService } from './material-property.service';

describe('MaterialPropertyService', () => {
  let service: MaterialPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialPropertyService],
    }).compile();

    service = module.get<MaterialPropertyService>(MaterialPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
