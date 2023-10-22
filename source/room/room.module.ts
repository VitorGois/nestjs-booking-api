import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelModule } from '../hotel/hotel.module';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [
    HotelModule,
    TypeOrmModule.forFeature([ Room ]),
  ],
  controllers: [ RoomController ],
  providers: [ RoomService ],
  exports: [
    TypeOrmModule,
    RoomService,
  ],
})
export class RoomModule { }
