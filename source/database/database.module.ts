import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '../address/address.entity';
import { Booking } from '../booking/booking.entity';
import { Hotel } from '../hotel/hotel.entity';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { DatabaseLogger } from './database.logger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          Address,
          Booking,
          Hotel,
          Room,
          User,
        ],
        logger: new DatabaseLogger(),
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule { }
