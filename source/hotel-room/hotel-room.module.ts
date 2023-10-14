import { Module } from '@nestjs/common';

import { HotelModule } from '../hotel/hotel.module';
import { RoomModule } from '../room/room.module';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';

@Module({
  imports: [
    HotelModule,
    RoomModule,
  ],
  controllers: [ HotelRoomController ],
  providers: [ HotelRoomService ],
  exports: [],
})
export class HotelRoomModule { }
