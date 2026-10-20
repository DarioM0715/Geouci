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
  Query,
} from '@nestjs/common';
import { LocationsRequestService } from './locations-request.service.js';
import { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';
import { FindLocationsRequestQueryDto } from './dto/find-locations-request-query.dto.js';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';
import { BulkDeleteDto } from '../common/dto/bulk-delete.dto.js';

@Controller('locations-request')
export class LocationsRequestController {
  constructor(private readonly locationsRequestService: LocationsRequestService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 400, description: "Bad Request."})
  createLocationsRequest(@Body() createLocationsRequestDto: CreateLocationsRequestDto) {
    return this.locationsRequestService.create(createLocationsRequestDto);
  }

  @Get()
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getAllLocationsRequests(@Query() query: FindLocationsRequestQueryDto) {
    return this.locationsRequestService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getLocationsRequest(@Param('id', ParseIntPipe) id: number) {
    return this.locationsRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, description: "Bad Request."})
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

  @Post('bulk-delete')
  @Roles(Role.gestor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Los registros han sido eliminados.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Record Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  bulkDeleteLocationsRequests(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.locationsRequestService.removeMany(bulkDeleteDto.ids);
  }
}