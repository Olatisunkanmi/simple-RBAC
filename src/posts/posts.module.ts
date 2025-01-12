import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
