import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RolesModule } from './roles/roles.module.js';

@Module({
  imports: [UsersModule, PrismaModule, EventsModule, LocationsModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
