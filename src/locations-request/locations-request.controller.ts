import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationsRequestService } from './locations-request.service.js';
import { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';

@Controller('locations-request')
export class LocationsRequestController {
  constructor(private readonly locationsRequestService: LocationsRequestService) {}

  @Post()
  createLocationsRequest(@Body() createLocationsRequestDto: CreateLocationsRequestDto) {
    return this.locationsRequestService.create(createLocationsRequestDto);
  }

  @Get()
  getAllLocationsRequests() {
    return this.locationsRequestService.findAll();
  }

  @Get(':id')
  getLocationsRequest(@Param('id', ParseIntPipe) id: number) {
    return this.locationsRequestService.findOne(id);
  }

  @Patch(':id')
  updateLocationsRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationsRequestDto: UpdateLocationsRequestDto,
  ) {
    return this.locationsRequestService.update(id, updateLocationsRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeLocationsRequest(@Param('id', ParseIntPipe) id: number) {
    return this.locationsRequestService.remove(id);
  }
}