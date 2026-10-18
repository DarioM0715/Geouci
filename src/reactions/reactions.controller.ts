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
import { ReactionsService } from './reactions.service.js';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { UpdateReactionDto } from './dto/update-reaction.dto.js';
import { FindReactionsQueryDto } from './dto/find-reactions-query.dto.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 400, description: "Bad Request."})
  createReaction(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getAllReactions(@Query() query: FindReactionsQueryDto) {
    return this.reactionsService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Record Not Found.'})
  getReaction(@Param('id', ParseIntPipe) id: number) {
    return this.reactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, description: "Bad Request."})
  updateReaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionsService.update(id, updateReactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeReaction(@Param('id', ParseIntPipe) id: number) {
    return this.reactionsService.remove(id);
  }
}