import { Test, TestingModule } from '@nestjs/testing';
import { LocationsRequestService } from './locations-request.service.js';

describe('LocationsRequestService', () => {
  let service: LocationsRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsRequestService],
    }).compile();

    service = module.get<LocationsRequestService>(LocationsRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
