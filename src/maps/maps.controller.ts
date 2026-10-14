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
import { MapsService } from './maps.service.js';
import { CreateMapDto } from './dto/create-map.dto.js';
import { UpdateMapDto } from './dto/update-map.dto.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 400, description: "Bad Request."})
  createMap(@Body() createMapDto: CreateMapDto) {
    return this.mapsService.create(createMapDto);
  }

  @Get()
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getAllMaps() {
    return this.mapsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getMap(@Param('id', ParseIntPipe) id: number) {
    return this.mapsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, description: "Bad Request."})
  updateMap(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMapDto: UpdateMapDto,
  ) {
    return this.mapsService.update(id, updateMapDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMap(@Param('id', ParseIntPipe) id: number) {
    return this.mapsService.remove(id);
  }
}