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
import { ComplaintsService } from './complaints.service.js';
import { CreateComplaintDto } from './dto/create-complaint.dto.js';
import { UpdateComplaintDto } from './dto/update-complaint.dto.js';
import { FindComplaintsQueryDto } from './dto/find-complaints-query.dto.js';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 400, description: "Bad Request."})
  createComplaint(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  @Roles(Role.gestor)
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getAllComplaints(@Query() query: FindComplaintsQueryDto) {
    return this.complaintsService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.gestor)
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getComplaint(@Param('id', ParseIntPipe) id: number) {
    return this.complaintsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, description: "Bad Request."})
  updateComplaint(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeComplaint(@Param('id', ParseIntPipe) id: number) {
    return this.complaintsService.remove(id);
  }
}