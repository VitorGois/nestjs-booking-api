import { Module } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomController } from './hotel-room.controller';

@Module({
  controllers: [HotelRoomController],
  providers: [HotelRoomService]
})
export class HotelRoomModule {}
