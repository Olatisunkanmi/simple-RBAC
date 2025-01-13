import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from 'config/core.module';
import { configuration, validate } from 'config/configuration';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    CoreModule,
    PrismaModule,
    UsersModule,
    PostsModule,
    AbilityModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
