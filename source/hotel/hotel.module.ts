import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address/address.module';
import { HotelController } from './hotel.controller';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Hotel ]),
    AddressModule,
  ],
  providers: [ HotelService ],
  controllers: [ HotelController ],
  exports: [ HotelService ],
})
export class HotelModule { }
