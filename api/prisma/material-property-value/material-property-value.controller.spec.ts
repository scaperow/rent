import { Test, TestingModule } from '@nestjs/testing';
import { MaterialPropertyValueController } from './material-property-value.controller';
import { MaterialPropertyValueService } from './material-property-value.service';

describe('MaterialPropertyValueController', () => {
  let controller: MaterialPropertyValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialPropertyValueController],
      providers: [MaterialPropertyValueService],
    }).compile();

    controller = module.get<MaterialPropertyValueController>(
      MaterialPropertyValueController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
