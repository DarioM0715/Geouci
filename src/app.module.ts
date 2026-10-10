import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';

@Module({
  imports: [UsersModule, PrismaModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
