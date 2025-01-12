import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.postsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.postsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
