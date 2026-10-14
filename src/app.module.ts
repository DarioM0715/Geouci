import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { LocationsRequestModule } from './locations-request/locations-request.module.js';
import { CommentsModule } from './comments/comments.module.js';
import { ReactionsModule } from './reactions/reactions.module.js';
import { ComplaintsModule } from './complaints/complaints.module.js';
import { MapsModule } from './maps/maps.module.js';

@Module({
  imports: [UsersModule, PrismaModule, EventsModule, LocationsModule, CategoriesModule, LocationsRequestModule, CommentsModule, ReactionsModule, ComplaintsModule, MapsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
