import { Test, TestingModule } from '@nestjs/testing';
import { LocationsRequestController } from './locations-request.controller.js';
import { LocationsRequestService } from './locations-request.service.js';

describe('LocationsRequestController', () => {
  let controller: LocationsRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsRequestController],
      providers: [LocationsRequestService],
    }).compile();

    controller = module.get<LocationsRequestController>(LocationsRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
