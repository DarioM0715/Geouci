import { Module } from '@nestjs/common';
import { LocationsRequestService } from './locations-request.service.js';
import { LocationsRequestController } from './locations-request.controller.js';

@Module({
  controllers: [LocationsRequestController],
  providers: [LocationsRequestService],
})
export class LocationsRequestModule {}
