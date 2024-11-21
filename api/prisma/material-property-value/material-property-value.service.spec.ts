import { Test, TestingModule } from '@nestjs/testing';
import { MaterialPropertyValueService } from './material-property-value.service';

describe('MaterialPropertyValueService', () => {
  let service: MaterialPropertyValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialPropertyValueService],
    }).compile();

    service = module.get<MaterialPropertyValueService>(
      MaterialPropertyValueService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
