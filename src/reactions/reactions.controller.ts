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
import { ReactionsService } from './reactions.service.js';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { UpdateReactionDto } from './dto/update-reaction.dto.js';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  createReaction(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  getAllReactions() {
    return this.reactionsService.findAll();
  }

  @Get(':id')
  getReaction(@Param('id', ParseIntPipe) id: number) {
    return this.reactionsService.findOne(id);
  }

  @Patch(':id')
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