import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { RoomModule } from './room/room.module';
import { HotelRoomModule } from './hotel-room/hotel-room.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [UserModule, HotelModule, RoomModule, HotelRoomModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
