import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { BookingModule } from './booking/booking.module';
import { ConfigAppModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HotelModule } from './hotel/hotel.module';
import { AppLoggerMiddleware } from './middleware/logger.middleware';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigAppModule,
    DatabaseModule,
    AddressModule,
    BookingModule,
    HotelModule,
    RoomModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  /**
   *
   * @param consumer
   */
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes('*');
  }

}
