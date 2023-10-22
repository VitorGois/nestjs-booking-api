import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelModule } from '../hotel/hotel.module';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Booking ]),
    UserModule,
    HotelModule,
    RoomModule,
  ],
  providers: [ BookingService ],
  controllers: [ BookingController ],
  exports: [ BookingService ],
})
export class BookingModule { }
