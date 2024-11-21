import { Test, TestingModule } from '@nestjs/testing';
import { MaterialPropertyController } from './material-property.controller';
import { MaterialPropertyService } from './material-property.service';

describe('MaterialPropertyController', () => {
  let controller: MaterialPropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialPropertyController],
      providers: [MaterialPropertyService],
    }).compile();

    controller = module.get<MaterialPropertyController>(MaterialPropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
